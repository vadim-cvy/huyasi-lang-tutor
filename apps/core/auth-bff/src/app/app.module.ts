import { AppTypeModule } from '@huyasi/core-auth-bff-app-type';
import { SessionModule } from '@huyasi/core-auth-bff-session';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { loadConfig } from './load-config.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    AppTypeModule,
    SessionModule,
  ],
})
export class AppModule {}
