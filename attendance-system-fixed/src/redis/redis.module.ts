import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        const client = createClient({
          url: 'redis://localhost:6379'
        });
        await client.connect();
        return {
          store: () => client
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}