import { Module } from '@nestjs/common';

import { AppTypeConfigService } from './config/app-type-config.service';
import { AppTypeContextIdStrategyInitializerService } from './context-id-strategy/app-type-context-id-strategy-initializer.service';
import { AppTypeCurrentContextIdService } from './current-context-id/app-type-current-context-id.service';
import { AppTypeRequestUtilsService } from './request-utils/app-type-request-utils.service';

@Module({
  providers: [
    AppTypeConfigService,
    AppTypeRequestUtilsService,
    AppTypeContextIdStrategyInitializerService,
    AppTypeCurrentContextIdService,
  ],
  exports: [AppTypeCurrentContextIdService, AppTypeRequestUtilsService],
})
export class AppTypeModule {}
