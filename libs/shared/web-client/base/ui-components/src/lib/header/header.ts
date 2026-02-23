import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LogoTitle } from '../logo-title/logo-title';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-header',
  imports: [LogoTitle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
