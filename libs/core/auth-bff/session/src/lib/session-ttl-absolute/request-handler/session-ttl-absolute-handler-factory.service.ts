import { AppTypeRequestUtilsService } from '@huyasi/core-auth-bff-app-type';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { SessionConfigService } from '../../config/session-config.service';
import { RequestSession } from './request-session.type';
import { SessionTtlAbsoluteHandler } from './session-ttl-absolute-handler';

@Injectable()
export class SessionTtlAbsoluteHandlerFactoryService {
  public constructor(
    private readonly sessionConfigService: SessionConfigService,
    private readonly appTypeRequestUtilsService: AppTypeRequestUtilsService,
  ) {}

  public createSessionHandler(req: Request): SessionTtlAbsoluteHandler {
    const appType = this.appTypeRequestUtilsService.getAppTypeByRequest(req);

    const session = this.getRequestSession(req);

    const ttlAbsoluteMs = this.sessionConfigService.get('ttl').absoluteMs[appType];

    return new SessionTtlAbsoluteHandler(session, ttlAbsoluteMs);
  }

  private getRequestSession(req: Request): RequestSession {
    const { session } = req;

    if (!session) {
      // FIXME: throw (session is marked as required, but in fact it can be missing if express session middleware is not called before)
    }

    return session;
  }
}
