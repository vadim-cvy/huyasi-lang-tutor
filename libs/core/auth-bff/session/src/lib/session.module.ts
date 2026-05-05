import { AppTypeModule } from '@huyasi/core-auth-bff-app-type';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { SessionConfigService } from './config/session-config.service';
import { ExpressSessionMiddlewareOriginalFactoryService } from './express-session-wrapper/express-session-middleware-original-factory.service';
import { ExpressSessionWrapperMiddleware } from './express-session-wrapper/express-session-wrapper.middleware';
import { RedisClientService } from './express-session-wrapper/session-store/redis/redis-client.service';
import { RedisStoreFactoryService } from './express-session-wrapper/session-store/redis/redis-store-factory.service';
import { SessionStoreService } from './express-session-wrapper/session-store/session-store.service';
import { SessionTtlAbsoluteHandlerFactoryService } from './session-ttl-absolute/request-handler/session-ttl-absolute-handler-factory.service';
import { SessionTTLAbsoluteMiddleware } from './session-ttl-absolute/session-ttl-absolute.middleware';

@Module({
  imports: [AppTypeModule],
  providers: [
    SessionConfigService,
    RedisClientService,
    RedisStoreFactoryService,
    SessionStoreService,
    SessionTtlAbsoluteHandlerFactoryService,
    ExpressSessionMiddlewareOriginalFactoryService,
  ],
})
export class SessionModule {
  public configure(consumer: MiddlewareConsumer): void {
    // FIXME: do we really need it to apply for all routes?
    consumer.apply(ExpressSessionWrapperMiddleware, SessionTTLAbsoluteMiddleware).forRoutes('*');
  }
}
