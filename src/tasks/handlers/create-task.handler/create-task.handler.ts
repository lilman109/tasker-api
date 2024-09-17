import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from 'src/tasks/commands/create-task.command/create-task.command';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { title } = command;
    const userId = await this.redis.getUserId();

    if (!userId) {
      throw new Error('User not found');
    }

    return this.prisma.task.create({
      data: {
        title,
        user: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
    });
  }
}
