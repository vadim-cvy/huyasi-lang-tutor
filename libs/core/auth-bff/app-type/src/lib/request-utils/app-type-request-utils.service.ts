import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

import type { AppType } from '../app-type.type';
import { AppTypeConfigService } from '../config/app-type-config.service';

@Injectable()
export class AppTypeRequestUtilsService {
  public constructor(private readonly appTypeConfigService: AppTypeConfigService) {}

  public getAppTypeByRequest(req: Request): AppType {
    // FIXME: is it safe? will proxy distinguish it really good, or anyone can fake forwarded host?
    const host = req.get('x-forwarded-host') ?? req.get('host') ?? '';

    return this.getAppTypeByHost(host);
  }

  private getAppTypeByHost(host: string): AppType {
    switch (host) {
      case this.getAppHost('public'):
        return 'public';
      case this.getAppHost('admin'):
        return 'admin';
      default:
        throw new Error(`Unknown host: ${host}`);
    }
  }

  private getAppHost(appType: AppType): string {
    return this.appTypeConfigService.getAppBaseUrl(appType).host;
  }
}
