import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../comands/create-task.command/create-task.command';

@Controller('tasks')
export class TasksController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body('title') title: string) {
    return this.commandBus.execute(new CreateTaskCommand(title));
  }
}
