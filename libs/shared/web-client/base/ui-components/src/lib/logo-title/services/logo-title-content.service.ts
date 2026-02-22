import { Injectable } from '@angular/core';

import type { LogoTitleContent } from '../abstract/LogoTitleContent';
import type { ILogoTitleContentService } from './logo-title-content.service.interface';

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
