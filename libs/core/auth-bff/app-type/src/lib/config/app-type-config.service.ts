import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import z from 'zod';

import { appTypeConfigSchema } from './app-type-config.schema';

type AppTypeConfig = z.infer<typeof appTypeConfigSchema>;
type AppTypeConfigUnwrapped = AppTypeConfig['appType'];

@Injectable()
export class AppTypeConfigService {
  public constructor(private readonly configService: ConfigService<AppTypeConfig, true>) {}

  public get<K extends keyof AppTypeConfigUnwrapped>(key: K): AppTypeConfigUnwrapped[K] {
    return this.configService.get('appType', { infer: true })[key];
  }
}
