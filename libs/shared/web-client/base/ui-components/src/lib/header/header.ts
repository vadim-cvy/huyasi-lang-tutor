import { Component } from '@angular/core';
import { LogoTitle } from '../logo-title/logo-title';

@Component({
  selector: 'shared-base-header',
  imports: [LogoTitle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
