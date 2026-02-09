import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import logoSrc from './assets/img/logo.png';

@Component({
  selector: 'shared-base-logo-title',
  imports: [RouterLink],
  templateUrl: './logo-title.html',
  styleUrl: './logo-title.scss',
})
export class LogoTitle {
  public readonly logoSrc = logoSrc;
}
