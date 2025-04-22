import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private readonly redisClient: RedisClientType;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    this.redisClient = createClient({
      url: 'redis://localhost:6379'
    }) as RedisClientType;
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      await this.redisClient.connect();
      console.log('Redis service initialized');
      await this.verifyConnection();
    } catch (error) {
      console.error('Redis initialization failed:', error);
      throw error;
    }
  }

  private async verifyConnection(): Promise<void> {
    try {
      await this.redisClient.set('connection:test', 'success', { EX: 5 });
      const value = await this.redisClient.get('connection:test');
      if (value !== 'success') {
        throw new Error('Redis verification failed');
      }
      console.log('Redis connection verified');
    } catch (error) {
      console.error('Redis connection verification failed:', error);
      throw error;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      await this.redisClient.set(key, serialized, { EX: ttl });
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      return false;
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const value = await this.redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Redis delete error:', error);
      return false;
    }
  }

  async getAllKeys(pattern: string = '*'): Promise<string[]> {
    try {
      const keys: string[] = [];
      for await (const key of this.redisClient.scanIterator({
        MATCH: pattern,
        COUNT: 100
      })) {
        keys.push(key);
      }
      return keys;
    } catch (error) {
      console.error('Redis keys scan error:', error);
      return [];
    }
  }

  async flushAll(): Promise<boolean> {
    try {
      await this.redisClient.flushAll();
      return true;
    } catch (error) {
      console.error('Redis flush error:', error);
      return false;
    }
  }

  async debugCache(): Promise<void> {
    try {
      console.log('=== REDIS CACHE DEBUG ===');
      const allKeys = await this.getAllKeys();
      
      for (const key of allKeys) {
        const value = await this.get(key);
        console.log(`Key: ${key}`);
        console.log(`Value:`, value);
        console.log('---------------------');
      }
      
      console.log('=== DEBUG COMPLETE ===');
    } catch (error) {
      console.error('Cache debug failed:', error);
    }
  }
}