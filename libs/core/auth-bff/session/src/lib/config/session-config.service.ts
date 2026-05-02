import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import z from 'zod';

import { sessionConfigSchema } from './session-config.schema';

type SessionConfig = z.infer<typeof sessionConfigSchema>;
type SessionConfigUnwrapped = SessionConfig['session'];

@Injectable()
export class SessionConfigService {
  public constructor(private readonly configService: ConfigService<SessionConfig, true>) {}

  public get<K extends keyof SessionConfigUnwrapped>(key: K): SessionConfigUnwrapped[K] {
    return this.configService.get('session', { infer: true })[key];
  }
}
