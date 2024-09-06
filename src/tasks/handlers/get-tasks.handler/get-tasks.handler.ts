import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTasksQuery } from 'src/tasks/queries/get-tasks.query/get-tasks.query';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetTasksQuery) {
    return this.prisma.task.findMany();
  }
}
