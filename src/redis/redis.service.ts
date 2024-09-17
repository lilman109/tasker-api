import { Inject, Injectable } from '@nestjs/common';

import { RedisRepository } from './redis.repository';
import { RedisPrefixEnum } from './redis-prefix-enum';

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  async saveUserId(userId: string): Promise<void> {
    console.log('userId', userId);
    return await this.redisRepository.set(RedisPrefixEnum.USER_ID, userId);
  }

  async getUserId(): Promise<string> {
    return await this.redisRepository.get(RedisPrefixEnum.USER_ID);
  }
}
