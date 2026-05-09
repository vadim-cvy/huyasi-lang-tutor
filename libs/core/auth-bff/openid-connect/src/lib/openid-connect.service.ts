import { AppTypeCurrentContextIdService } from '@huyasi/core-auth-bff-app-type';
import { Injectable } from '@nestjs/common';

import { OpenidClientService } from './openid-client/openid-client.service';
import { RequestSession } from './request-session.type';

@Injectable()
export class OpenidConnectService {
  private readonly appBaseUrl: URL = this.appTypeCurrentContextIdService.appBaseUrl;

  public constructor(
    private readonly appTypeCurrentContextIdService: AppTypeCurrentContextIdService,
    private readonly openidClientService: OpenidClientService,
  ) {}

  public async buildLoginUrl(session: RequestSession, loginCallbackUrlPath: string): Promise<URL> {
    const loginCallbackUrl = new URL(this.appBaseUrl.toString() + loginCallbackUrlPath);

    const result = await this.openidClientService.buildLoginUrl(loginCallbackUrl);

    session.oidcState = result.state;
    session.save();

    return result.url;
  }
}
