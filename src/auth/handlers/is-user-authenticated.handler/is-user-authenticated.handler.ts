import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IsUserAuthenticatedQuery } from 'src/auth/queries/is-user-authenticated.query/is-user-authenticated.query';
import { RedisService } from 'src/redis/redis.service';

@QueryHandler(IsUserAuthenticatedQuery)
export class IsUserAuthenticatedHandler
  implements IQueryHandler<IsUserAuthenticatedQuery>
{
  constructor(private readonly redis: RedisService) {}

  async execute(query: IsUserAuthenticatedQuery) {
    const userId = await this.redis.getUserId();

    return !!userId;
  }
}
