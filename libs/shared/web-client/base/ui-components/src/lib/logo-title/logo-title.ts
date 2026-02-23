import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { LogoTitleContent } from './abstract/LogoTitleContent';
import { LogoTitleContentService } from './services/logo-title-content.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-logo-title',
  imports: [RouterLink],
  templateUrl: './logo-title.html',
  styleUrl: './logo-title.scss',
})
export class LogoTitle {
  private readonly logoTitleContentService = inject(LogoTitleContentService);

  public get content(): LogoTitleContent {
    return this.logoTitleContentService.content;
  }
}
