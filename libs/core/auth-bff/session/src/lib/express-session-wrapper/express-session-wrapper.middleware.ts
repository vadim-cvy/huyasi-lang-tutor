import { type AppContext, getRequestAppContext } from '@huyasi/core-auth-bff-app-context';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import session from 'express-session';

import { ExpressSessionMiddlewareOriginalFactoryService } from './express-session-middleware-original-factory.service';

@Injectable()
export class ExpressSessionWrapperMiddleware implements NestMiddleware {
  private readonly expressSessionMiddlewarePromises: Record<
    AppContext,
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
  ) {}

  public async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const appContext = getRequestAppContext(req);

    const expressSessionMiddleware = await this.expressSessionMiddlewarePromises[appContext];

    expressSessionMiddleware(req, res, next);
  }
}
