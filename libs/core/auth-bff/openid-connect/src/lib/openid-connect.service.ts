import { AppTypeCurrentContextIdService } from '@huyasi/core-auth-bff-app-type';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { OpenidClientService } from './openid-client/openid-client.service';
import { RequestSession } from './request-session.type';

@Injectable({
  scope: Scope.REQUEST,
  durable: false,
})
export class OpenidConnectService {
  private readonly appBaseUrl: URL = this.appTypeCurrentContextIdService.appBaseUrl;

  private readonly session: RequestSession = this.req.session;

  public constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly appTypeCurrentContextIdService: AppTypeCurrentContextIdService,
    private readonly openidClientService: OpenidClientService,
  ) {}

  // FIXME: maybe throw error if user is logged in already (or at least we need to empty session, or maybe ask user to logout first, maybe we should do it in controller)
  public async buildLoginUrl(loginCallbackUrlPath: string): Promise<URL> {
    const loginCallbackUrl = new URL(this.appBaseUrl.toString() + loginCallbackUrlPath);

    const result = await this.openidClientService.buildLoginUrl(loginCallbackUrl);

    this.session.oidcState = result.state;
    this.session.save();

    return result.url;
  }
}
