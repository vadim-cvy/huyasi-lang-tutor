import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { AppType } from '../app-type.type';
import { AppTypeConfigService } from '../config/app-type-config.service';
import { appTypeContextIdPayloadSchema } from '../context-id-strategy/payload/app-type-context-id-payload.schema';
import { AppTypeContextIdPayload } from '../context-id-strategy/payload/app-type-context-id-payload.type';

@Injectable({
  scope: Scope.REQUEST,
  durable: true,
})
export class AppTypeCurrentContextIdService {
  private readonly contextIdPayload: AppTypeContextIdPayload = appTypeContextIdPayloadSchema.parse(
    this.contextIdPayloadRaw,
  );

  public readonly appType: AppType = this.contextIdPayload.appType;

  public readonly appBaseUrl: URL = this.appTypeConfigService.getAppBaseUrl(this.appType);

  public constructor(
    @Inject(REQUEST) private readonly contextIdPayloadRaw: unknown,
    private readonly appTypeConfigService: AppTypeConfigService,
  ) {}
}
