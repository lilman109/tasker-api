import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteTaskCommand } from 'src/tasks/commands/delete-task.command/delete-task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteTaskCommand) {
    const { id } = command;

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
