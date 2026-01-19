import { Component } from '@angular/core';
import { NavPrimary } from '../nav-primary/nav-primary';
import { Button } from '../button/button';

@Component({
  selector: 'web-public-base-components-sidebar',
  imports: [NavPrimary, Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  // TODO: rename to isExpanded
  public isExpanded = true;
}
