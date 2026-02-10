import { Injectable, signal } from '@angular/core';
import { LogoTitleContent } from '../abstract/LogoTitleContent';

@Injectable({
  providedIn: 'root',
})
export class LogoTitleContentService {
  public readonly content = signal<LogoTitleContent|undefined>(undefined)
}
