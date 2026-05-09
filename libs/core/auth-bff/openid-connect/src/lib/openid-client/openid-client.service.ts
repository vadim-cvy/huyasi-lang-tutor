import { AppType, AppTypeCurrentContextIdPayloadService } from '@huyasi/core-auth-bff-app-type';
import { Injectable } from '@nestjs/common';
import * as openidClient from 'openid-client';

import { OpenidConnectConfigService } from '../config/openid-connect-config.service';

// FIXME: AppTypeCurrentContextIdPayloadService makes this provider request-scoped too. But I need to check if it becomes durable request-scoped provider. And mark it as durable if it isn't.
@Injectable()
export class OpenidClientService {
  private readonly appType: AppType = this.appTypeCurrentContextIdPayloadService.appType;

  private readonly authServerUrl: URL = this.openidConnectConfigService.get('authServer').url;

  private readonly clientId: string =
    this.openidConnectConfigService.get('authServer').clientId[this.appType];

  private readonly clientSecret: string =
    this.openidConnectConfigService.get('authServer').clientSecret[this.appType];

  private readonly configPromise: Promise<openidClient.Configuration> = openidClient.discovery(
    this.authServerUrl,
    this.clientId,
    this.clientSecret,
  );

  public constructor(
    private readonly appTypeCurrentContextIdPayloadService: AppTypeCurrentContextIdPayloadService,
    private readonly openidConnectConfigService: OpenidConnectConfigService,
  ) {}

  public async buildLoginUrl(loginCallbackUrl: URL): Promise<{ url: URL; state: string }> {
    const config = await this.configPromise;

    const state = openidClient.randomState();

    const url = openidClient.buildAuthorizationUrl(config, {
      ['redirect_uri']: loginCallbackUrl.href,
      scope: 'openid offline_access',
      state,
    });

    return { url, state };
  }

  public async handleLoginCallback(
    currentUrl: URL,
    expectedState: string,
  ): ReturnType<(typeof openidClient)['authorizationCodeGrant']> {
    const config = await this.configPromise;

    // FIXME: catch openidClient ResponseBodyError and throw respective Nest HTTP error (this error appears for example when the same code is submitted twice)
    return openidClient.authorizationCodeGrant(config, currentUrl, { expectedState });
  }
}
