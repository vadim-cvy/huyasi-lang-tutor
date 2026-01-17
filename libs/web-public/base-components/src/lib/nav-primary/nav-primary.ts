import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'web-public-base-components-nav-primary',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-primary.html',
  styleUrl: './nav-primary.scss',
})
export class NavPrimary {
  // TODO: replace with real items
  public readonly navItems: ReadonlyArray<{ label: string; route: string }> = [
    { label: 'Placeholder link 1', route: '/' },
    { label: 'Placeholder link 2', route: '/some-route-here' },
  ]
}
