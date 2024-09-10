import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { IsUserAuthenticatedQuery } from 'src/auth/queries/is-user-authenticated.query/is-user-authenticated.query';

@QueryHandler(IsUserAuthenticatedQuery)
export class IsUserAuthenticatedHandler
  implements IQueryHandler<IsUserAuthenticatedQuery>
{
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async execute(query: IsUserAuthenticatedQuery) {
    const cachedItem = await this.cacheManager.get('userId');
    if (cachedItem === null || cachedItem === undefined) {
      return false;
    }

    const userIdObject = cachedItem as { userId: number }; // type cast
    if (userIdObject.userId !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
