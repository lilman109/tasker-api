import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from 'src/tasks/commands/create-task.command/create-task.command';
import { PrismaService } from 'src/prisma/prisma.service';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateTaskCommand) {
    const { title } = command;
    return this.prisma.task.create({
      data: {
        title,
      },
    });
  }
}
