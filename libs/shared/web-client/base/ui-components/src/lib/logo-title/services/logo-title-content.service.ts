import { Injectable } from '@angular/core';

import type { LogoTitleContent } from '../abstract/LogoTitleContent';
import type { ILogoTitleContentService } from './logo-title-content.service.interface';

/**
 * Service for injecting content into LogoTitle component (from the apps).
 *
 * What's the purpose?:
 * LogoTitle component can be used in different apps (admin area, client area, etc),
 * each app needs to display different content in the component, so we can't hardcode
 * content in the component itself and need to inject it from the apps instead.
 */
@Injectable({
  providedIn: 'root',
})
export class LogoTitleContentService implements ILogoTitleContentService {
  private _contentNullable?: LogoTitleContent;

  public get content(): LogoTitleContent {
    if (!this._contentNullable) {
      throw new Error('Content is not set yet!');
    }

    return this._contentNullable;
  }

  public set content(val: LogoTitleContent) {
    if (this._contentNullable) {
      throw new Error('Content is set already!');
    }

    this._contentNullable = val;
  }
}
