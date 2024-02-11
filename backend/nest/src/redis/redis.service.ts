import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        ) {}

    async get(key: string): Promise<string>{
        return await this.cacheManager.get(key)
    }

    async set(key: string, value: string): Promise<void>{
        await this.cacheManager.set(key, value)
    }

    async incr(key: string): Promise<number>{
        try{
            const res = parseInt(await this.cacheManager.get(key)) + 1
            await this.cacheManager.set(key, res)
            return res
        } catch (e) {
            const res = 0;
            await this.cacheManager.set(key, res)
            return res
        }
    }

    async getTalkId(): Promise<number>{
        return await this.incr("talk_id")
    }
}
