import { AppType } from '@huyasi/core-auth-bff-app-type';
import { Injectable } from '@nestjs/common';
import session from 'express-session';

import { SessionConfigService } from '../config/session-config.service';
import { SessionStoreService } from './session-store/session-store.service';

@Injectable()
export class ExpressSessionMiddlewareOriginalFactoryService {
  public constructor(
    private readonly sessionConfigService: SessionConfigService,
    private readonly sessionStoreService: SessionStoreService,
  ) {}

  public async createExpressSessionMiddlewareOriginal(
    appType: AppType,
  ): Promise<ReturnType<typeof session>> {
    return session({
      store: await this.sessionStoreService.getStore(appType),
      secret: [...this.sessionConfigService.get('cookie').signIdSecrets],
      resave: false,
      // FIXME: set false
      saveUninitialized: true,
      unset: 'destroy',
      cookie: {
        path: '/',
        httpOnly: true,
        // FIXME: this will not work in local environment
        // secure: true,
        // sameSite: 'strict',
        maxAge: this.sessionConfigService.get('ttl').idleMs[appType],
      },
    });
  }
}
