import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisRepository } from './redis.repository';
import { redisClientFactory } from './redis-client.factory';

@Module({
  providers: [RedisService, RedisRepository, redisClientFactory],
  exports: [RedisService],
})
export class RedisModule {}
