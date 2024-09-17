import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { GetTasksQuery } from 'src/tasks/queries/get-tasks.query/get-tasks.query';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async execute(query: GetTasksQuery) {
    const userId = await this.redis.getUserId();

    if (!userId) {
      throw new Error('User not found');
    }

    return this.prisma.task.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
  }
}
