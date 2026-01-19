import { Component, input } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'web-public-base-components-nav-primary',
  imports: [Button],
  templateUrl: './nav-primary.html',
  styleUrl: './nav-primary.scss',
})
export class NavPrimary {
  // TODO: replace with real items
  public readonly navItems: ReadonlyArray<{
    label: string;
    route: string;
    iconName: string;
  }> = [
    { label: 'Placeholder link 1', route: '/', iconName: 'home' },
    { label: 'Placeholder link 2', route: '/some-route-here', iconName: 'info' },
  ]

  public readonly isMinimalistic = input.required<boolean>();

  public readonly orientation = input.required<'horizontal' | 'vertical'>();
}
