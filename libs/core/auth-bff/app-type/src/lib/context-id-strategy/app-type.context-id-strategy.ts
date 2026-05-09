import type { ContextId, ContextIdStrategy, HostComponentInfo } from '@nestjs/core';
import { ContextIdFactory } from '@nestjs/core';
import type { Request } from 'express';

import type { AppType } from '../app-type.type';
import type { AppTypeRequestUtilsService } from '../request-utils/app-type-request-utils.service';
import type { AppTypeContextIdPayload } from './payload/app-type-context-id-payload.type';

const appTypeContextIds = new Map<AppType, ContextId>();

const getAppTypeContextId = (appType: AppType): ContextId => {
  let appTypeContextId = appTypeContextIds.get(appType);

  if (!appTypeContextId) {
    appTypeContextId = ContextIdFactory.create();
    appTypeContextIds.set(appType, appTypeContextId);
  }

  return appTypeContextId;
};

/**
 * Aggregates requests based on if they relate to a *public* or *admin* app.
 *
 * Purpose:
 * Helps Nest to cache durable request-scoped providers.
 * So we have only 2 instances (admin and public) of each durable request-scoped
 * provider instead of a new instance for each new request.
 *
 * @see https://docs.nestjs.com/fundamentals/injection-scopes#durable-providers
 */
export class AppTypeContextIdStrategy implements ContextIdStrategy {
  public constructor(private readonly requestAppTypeResolverService: AppTypeRequestUtilsService) {}

  public attach(
    defaultContextId: ContextId,
    req: Request,
  ): {
    payload: AppTypeContextIdPayload;
    resolve(info: HostComponentInfo): ContextId;
  } {
    const appType = this.requestAppTypeResolverService.getAppTypeByRequest(req);

    const appTypeContextId = getAppTypeContextId(appType);

    return {
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? appTypeContextId : defaultContextId,
      payload: { appType },
    };
  }
}
