import type { AppContext } from '@huyasi/core-auth-bff-app-context';
import { Injectable } from '@nestjs/common';
import { RedisStore } from 'connect-redis';

import { RedisStoreFactoryService } from './redis/redis-store-factory.service';

@Injectable()
export class SessionStoreService {
  private readonly storePromises: Readonly<Record<AppContext, Promise<RedisStore>>> = {
    public: this.redisStoreService.createStore({ prefix: 'public' }),
    admin: this.redisStoreService.createStore({ prefix: 'admin' }),
  };

  public constructor(private readonly redisStoreService: RedisStoreFactoryService) {}

  public async getStore(appContext: AppContext): Promise<RedisStore> {
    return this.storePromises[appContext];
  }
}
