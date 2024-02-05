import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: "i10e101.p.ssafy.io",
      port: process.env.REDIS_PORT,
    }) ],
  providers: [RedisService],
  exports:[RedisService]
})
export class RedisModule {}
