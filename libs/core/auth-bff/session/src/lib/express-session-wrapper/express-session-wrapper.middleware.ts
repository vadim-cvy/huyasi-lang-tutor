import { type AppType, AppTypeRequestsUtilsService } from '@huyasi/core-auth-bff-app-type';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import session from 'express-session';

import { ExpressSessionMiddlewareOriginalFactoryService } from './express-session-middleware-original-factory.service';

@Injectable()
export class ExpressSessionWrapperMiddleware implements NestMiddleware {
  private readonly expressSessionMiddlewarePromises: Record<
    AppType,
    Promise<ReturnType<typeof session>>
  > = {
    public:
      this.expressSessionMiddlewareOriginalFactoryService.createExpressSessionMiddlewareOriginal(
        'public',
      ),
    admin:
      this.expressSessionMiddlewareOriginalFactoryService.createExpressSessionMiddlewareOriginal(
        'admin',
      ),
  };

  public constructor(
    private readonly expressSessionMiddlewareOriginalFactoryService: ExpressSessionMiddlewareOriginalFactoryService,
    private readonly appTypeRequestsUtilsService: AppTypeRequestsUtilsService,
  ) {}

  public async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const appType = this.appTypeRequestsUtilsService.getAppTypeByRequest(req);

    // FIXME: it is possible that sessions won't exist in Redis (it is expired and auto-deleted in redis) and a person access server with cookie (that expires during access, because it has only 1 more second to live). The question is: will express-session create a new session when it can't find session id passed in cookie?
    const expressSessionMiddleware = await this.expressSessionMiddlewarePromises[appType];

    expressSessionMiddleware(req, res, next);
  }
}
