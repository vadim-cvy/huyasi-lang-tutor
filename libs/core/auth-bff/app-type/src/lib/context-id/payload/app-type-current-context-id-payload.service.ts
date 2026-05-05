import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { AppType } from '../../app-type.type';
import { AppTypeConfigService } from '../../config/app-type-config.service';
import { appTypeContextIdPayloadSchema } from './app-type-context-id-payload.schema';
import { AppTypeContextIdPayload } from './app-type-context-id-payload.type';

@Injectable({
  scope: Scope.REQUEST,
  durable: true,
})
export class AppTypeCurrentContextIdPayloadService {
  private readonly payload: AppTypeContextIdPayload = appTypeContextIdPayloadSchema.parse(
    this.payloadRaw,
  );

  public readonly appType: AppType = this.payload.appType;

  public readonly appBaseUrl: URL = this.appTypeConfigService.get('appBaseUrl')[this.appType];

  public constructor(
    @Inject(REQUEST) private readonly payloadRaw: unknown,
    private readonly appTypeConfigService: AppTypeConfigService,
  ) {}
}
