import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'web-public-base-components-nav-primary',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-primary.html',
  styleUrl: './nav-primary.scss',
})
export class NavPrimary {
  // TODO: replace with real items
  public readonly navItems: ReadonlyArray<{
    label: string;
    route: string;
    icon: string;
  }> = [
    { label: 'Placeholder link 1', route: '/', icon: 'home' },
    { label: 'Placeholder link 2', route: '/some-route-here', icon: 'info' },
  ]

  public readonly areLabelsVisible = input.required<boolean>();

  public readonly orientation = input.required<'horizontal' | 'vertical'>();
}
