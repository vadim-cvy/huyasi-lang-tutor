import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import z from 'zod';

import { openidConnectConfigSchema } from './openid-connect-config.schema';

type OpenidConnectConfig = z.infer<typeof openidConnectConfigSchema>;
type OpenidConnectConfigUnwrapped = OpenidConnectConfig['openidConnect'];

@Injectable()
export class OpenidConnectConfigService {
  public constructor(private readonly configService: ConfigService<OpenidConnectConfig, true>) {}

  public get<K extends keyof OpenidConnectConfigUnwrapped>(
    key: K,
  ): OpenidConnectConfigUnwrapped[K] {
    return this.configService.get('openidConnect', { infer: true })[key];
  }
}
