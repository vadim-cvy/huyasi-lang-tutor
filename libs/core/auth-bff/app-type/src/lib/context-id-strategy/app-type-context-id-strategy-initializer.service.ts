import { Injectable, OnModuleInit } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';

import { AppTypeRequestUtilsService } from '../request-utils/app-type-request-utils.service';
import { AppTypeContextIdStrategy } from './app-type.context-id-strategy';

@Injectable()
export class AppTypeContextIdStrategyInitializerService implements OnModuleInit {
  public constructor(private readonly requestAppTypeResolverService: AppTypeRequestUtilsService) {}

  public onModuleInit(): void {
    ContextIdFactory.apply(new AppTypeContextIdStrategy(this.requestAppTypeResolverService));
  }
}
