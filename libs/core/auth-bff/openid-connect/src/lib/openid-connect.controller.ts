import { Controller, Get, HttpRedirectResponse, HttpStatus, Redirect } from '@nestjs/common';

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
  public async login(): Promise<HttpRedirectResponse> {
    const loginUrl = await this.openidConnectService.buildLoginUrl(loginCallbackUrlPath);

    return {
      url: loginUrl.href,
      statusCode: HttpStatus.TEMPORARY_REDIRECT,
    };
  }

  @Get(routes.endpoints.loginCallback)
  @Redirect()
  public async loginCallback(): Promise<HttpRedirectResponse> {
    await this.openidConnectService.handleLoginCallback();

    return {
      url: '/',
      statusCode: HttpStatus.TEMPORARY_REDIRECT,
    };
  }

  @Get(routes.endpoints.logout)
  public logout(): void {
    // FIXME: implement this method
  }
}
