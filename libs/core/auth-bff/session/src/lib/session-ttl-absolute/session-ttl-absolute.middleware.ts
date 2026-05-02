import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { SessionTtlAbsoluteHandlerFactoryService } from './request-handler/session-ttl-absolute-handler-factory.service';

@Injectable()
export class SessionTTLAbsoluteMiddleware implements NestMiddleware {
  public constructor(
    private readonly sessionHandlerFactoryService: SessionTtlAbsoluteHandlerFactoryService,
  ) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    const sessionHandler = this.sessionHandlerFactoryService.createSessionHandler(req);

    sessionHandler.handle();

    if (sessionHandler.isAbsoluteExpired) {
      // FIXME: should we throw any errors here, or we'll have onother middleware/filter that will prevent access without session?
      // FIXME: do we need this return statement or next() must be called instead? or we should even throw an exception instead of setting response here? or should we pass error to next?
      res.status(HttpStatus.UNAUTHORIZED).send('Session expired');
      return;
    }

    next();
  }
}
