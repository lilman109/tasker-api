import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from 'src/tasks/commands/create-task.command/create-task.command';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { title } = command;
    const cachedItem = await this.cacheManager.get('userId');

    if (cachedItem === null || cachedItem === undefined) {
      throw new Error('User not authenticated');
    }

    const userIdObject = cachedItem as { userId: number }; // type cast
    if (userIdObject.userId === undefined) {
      throw new Error('User not authenticated');
    }

    return this.prisma.task.create({
      data: {
        title,
        user: {
          connect: {
            id: userIdObject.userId,
          },
        },
      },
    });
  }
}
