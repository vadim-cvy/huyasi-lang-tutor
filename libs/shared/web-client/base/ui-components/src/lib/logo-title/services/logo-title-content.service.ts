import { Injectable } from '@angular/core';
import { LogoTitleContent } from '../abstract/LogoTitleContent';

@Injectable({
  providedIn: 'root',
})
export class LogoTitleContentService {
  private _contentNullable?: LogoTitleContent

  public get content(): LogoTitleContent {
    if (!this._contentNullable) {
      throw new Error('Content is not set yet!')
    }

    return this._contentNullable
  }

  public set content(val: LogoTitleContent) {
    if (this._contentNullable) {
      throw new Error('Content is set already!')
    }

    this._contentNullable = val
  }
}
