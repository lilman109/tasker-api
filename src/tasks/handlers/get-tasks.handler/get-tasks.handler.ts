import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTasksQuery } from 'src/tasks/queries/get-tasks.query/get-tasks.query';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async execute(query: GetTasksQuery) {
    const cachedItem = await this.cacheManager.get('userId');
    if (cachedItem === null || cachedItem === undefined) {
      return null;
    }

    const userIdObject = cachedItem as { userId: number }; // type cast
    if (userIdObject.userId !== undefined) {
      return this.prisma.task.findMany({
        where: {
          userId: userIdObject.userId,
        },
      });
    } else {
      return null;
    }
  }
}
