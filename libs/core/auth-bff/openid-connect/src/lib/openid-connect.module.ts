import { AppTypeModule } from '@huyasi/core-auth-bff-app-type';
import { Module } from '@nestjs/common';

import { OpenidConnectConfigService } from './config/openid-connect-config.service';
import { OpenidClientService } from './openid-client/openid-client.service';
import { OpenidConnectController } from './openid-connect.controller';
import { OpenidConnectService } from './openid-connect.service';

@Module({
  imports: [AppTypeModule],
  controllers: [OpenidConnectController],
  providers: [OpenidConnectConfigService, OpenidClientService, OpenidConnectService],
})
export class OpenidConnectModule {}
