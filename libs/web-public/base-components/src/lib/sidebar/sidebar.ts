import { Component } from '@angular/core';
import { NavPrimary } from '../nav-primary/nav-primary';

@Component({
  selector: 'web-public-base-components-sidebar',
  imports: [NavPrimary],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public isSidebarExpanded = true;
}
