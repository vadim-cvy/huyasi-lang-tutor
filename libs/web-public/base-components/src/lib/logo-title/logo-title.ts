import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'web-public-base-components-logo-title',
  imports: [RouterLink],
  templateUrl: './logo-title.html',
  styleUrl: './logo-title.scss',
})
export class LogoTitle {
  public readonly logoSrc = '/assets/base-components/logo-title/img/logo.png';
}
