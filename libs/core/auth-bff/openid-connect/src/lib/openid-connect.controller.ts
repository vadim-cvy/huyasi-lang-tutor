import {
  Controller,
  Get,
  HttpRedirectResponse,
  HttpStatus,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { OpenidConnectService } from './openid-connect.service';

const routes = {
  globalPrefix: 'auth/oidc',
  endpoints: {
    login: 'login',
    loginCallback: 'login-callback',
    logout: 'logout',
  },
};

const loginCallbackUrlPath = `${routes.globalPrefix}/${routes.endpoints.loginCallback}`;

@Controller(routes.globalPrefix)
export class OpenidConnectController {
  public constructor(private readonly openidConnectService: OpenidConnectService) {}

  @Get(routes.endpoints.login)
  @Redirect()
  public async login(@Req() req: Request): Promise<HttpRedirectResponse> {
    const loginUrl = await this.openidConnectService.buildLoginUrl(
      req.session,
      loginCallbackUrlPath,
    );

    return {
      url: loginUrl.href,
      statusCode: HttpStatus.TEMPORARY_REDIRECT,
    };
  }

  // FIXME: add validation pipe
  @Get(routes.endpoints.loginCallback)
  public loginCallback(@Query('code') code: string) {
    // FIXME: implement this method
  }

  @Get(routes.endpoints.logout)
  public logout() {
    // FIXME: implement this method
  }
}
