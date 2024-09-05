import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
