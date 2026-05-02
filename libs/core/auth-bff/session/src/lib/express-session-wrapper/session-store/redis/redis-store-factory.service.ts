import { Injectable } from '@nestjs/common';
import { RedisStore } from 'connect-redis';

import { RedisClientService } from './redis-client.service';

@Injectable()
export class RedisStoreFactoryService {
  public constructor(private readonly redisClientService: RedisClientService) {}

  // FIXME: what this prefix should be? do we need it at all? should we prefix it with "sess"?
  public async createStore(config: Readonly<{ prefix: string }>): Promise<RedisStore> {
    return new RedisStore({
      ...config,
      client: await this.redisClientService.redisClientPromise,
    });
  }
}
