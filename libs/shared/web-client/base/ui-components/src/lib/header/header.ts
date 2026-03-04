import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ColorSchemeToggle } from '../color-scheme-toggle/color-scheme-toggle';
import { LogoTitle } from '../logo-title/logo-title';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-header',
  imports: [LogoTitle, ColorSchemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
