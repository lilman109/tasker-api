import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTaskHandler } from './handlers/create-task.handler/create-task.handler';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetTasksHandler } from './handlers/get-tasks.handler/get-tasks.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [CreateTaskHandler, GetTasksHandler],
  controllers: [TasksController],
})
export class TasksModule {}
