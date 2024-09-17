import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../commands/create-task.command/create-task.command';
import { GetTasksQuery } from '../queries/get-tasks.query/get-tasks.query';
import { DeleteTaskCommand } from '../commands/delete-task.command/delete-task.command';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: { title: string }) {
    const { title } = body;
    return this.commandBus.execute(new CreateTaskCommand(title));
  }

  @Get()
  async get() {
    return this.queryBus.execute(new GetTasksQuery());
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
