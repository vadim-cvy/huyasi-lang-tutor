import type { AppType } from '@huyasi/core-auth-bff-app-type';
import { Injectable } from '@nestjs/common';
import { RedisStore } from 'connect-redis';

import { RedisStoreFactoryService } from './redis/redis-store-factory.service';

@Injectable()
export class SessionStoreService {
  private readonly storePromises: Readonly<Record<AppType, Promise<RedisStore>>> = {
    public: this.redisStoreService.createStore({ prefix: 'public' }),
    admin: this.redisStoreService.createStore({ prefix: 'admin' }),
  };

  public constructor(private readonly redisStoreService: RedisStoreFactoryService) {}

  public async getStore(appType: AppType): Promise<RedisStore> {
    return this.storePromises[appType];
  }
}
