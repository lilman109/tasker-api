import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../commands/create-task.command/create-task.command';
import { GetTasksQuery } from '../queries/get-tasks.query/get-tasks.query';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body('title') title: string) {
    return this.commandBus.execute(new CreateTaskCommand(title));
  }

  @Get()
  async get() {
    return this.queryBus.execute(new GetTasksQuery());
  }
}
