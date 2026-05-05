import { Module } from '@nestjs/common';

import { AppTypeConfigService } from './config/app-type-config.service';
import { AppTypeCurrentContextIdPayloadService } from './context-id/payload/app-type-current-context-id-payload.service';
import { AppTypeContextIdStrategyInitializerService } from './context-id/strategy/app-type-context-id-strategy-initializer.service';
import { AppTypeRequestsUtilsService } from './requests-utils/app-type-requests-utils.service';

@Module({
  providers: [
    AppTypeConfigService,
    AppTypeCurrentContextIdPayloadService,
    AppTypeRequestsUtilsService,
    AppTypeContextIdStrategyInitializerService,
  ],
  exports: [AppTypeCurrentContextIdPayloadService, AppTypeRequestsUtilsService],
})
export class AppTypeModule {}
