import { Injectable, OnModuleInit } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';

import { AppTypeRequestsUtilsService } from '../../requests-utils/app-type-requests-utils.service';
import { AppTypeContextIdStrategy } from './app-type.context-id-strategy';

@Injectable()
export class AppTypeContextIdStrategyInitializerService implements OnModuleInit {
  public constructor(private readonly AppTypeRequestsUtilsService: AppTypeRequestsUtilsService) {}

  public onModuleInit(): void {
    ContextIdFactory.apply(new AppTypeContextIdStrategy(this.AppTypeRequestsUtilsService));
  }
}
