import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoTitleContentService } from './services/logo-title-content.service';

@Component({
  selector: 'shared-base-logo-title',
  imports: [RouterLink],
  templateUrl: './logo-title.html',
  styleUrl: './logo-title.scss',
})
export class LogoTitle {
  private readonly logoTitleContentService = inject(LogoTitleContentService)

  public readonly content = this.logoTitleContentService.content.asReadonly()
}
