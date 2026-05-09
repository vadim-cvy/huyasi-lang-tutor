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

  private get currentUrl(): URL {
    const currentPathWithoutLeadingSlash = this.req.url.slice(1);

    return new URL(this.appBaseUrl.toString() + currentPathWithoutLeadingSlash);
  }

  private readonly session: RequestSession = this.req.session;

  private get sessionOpenidConnectDataRef(): NonNullable<RequestSession['oidc']> {
    if (!this.session.oidc) {
      this.session.oidc = {};
    }

    return this.session.oidc;
  }

  private get sessionOpenidConnectStateSafe(): NonNullable<
    NonNullable<RequestSession['oidc']>['state']
  > {
    const { state } = this.sessionOpenidConnectDataRef;

    if (!state) {
      throw new Error('State is not set!');
    }

    return state;
  }

  public constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly appTypeCurrentContextIdService: AppTypeCurrentContextIdService,
    private readonly openidClientService: OpenidClientService,
  ) {}

  // FIXME: maybe throw error if user is logged in already (or at least we need to empty session, or maybe ask user to logout first, maybe we should do it in controller)
  public async buildAuthServerLoginUrl(loginCallbackUrlPath: string): Promise<URL> {
    const loginCallbackUrl = new URL(this.appBaseUrl.toString() + loginCallbackUrlPath);

    const result = await this.openidClientService.buildLoginUrl(loginCallbackUrl);

    this.sessionOpenidConnectDataRef.state = result.state;
    this.session.save();

    return result.url;
  }

  // FIXME: maybe throw error if user is logged in already (or at least we need to empty session, or maybe ask user to logout first, maybe we should do it in controller)
  public async handleLoginCallback(): Promise<void> {
    const result = await this.openidClientService.handleLoginCallback(
      this.currentUrl,
      this.sessionOpenidConnectStateSafe,
    );

    if (!result.refresh_token) {
      throw new Error('Refresh token is missing!');
    }

    if (!result.id_token) {
      throw new Error('Id token is missing!');
    }

    // FIXME: maybe save other data too?
    this.sessionOpenidConnectDataRef.tokens = {
      access: result.access_token,
      refresh: result.refresh_token,
      id: result.id_token,
    };
  }
}
