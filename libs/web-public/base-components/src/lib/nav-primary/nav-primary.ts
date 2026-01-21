import { Component, input } from '@angular/core';
import { Button } from '../button/button';
import { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import { WhitespaceSize } from '@huyasi/web-public-shared-styles';

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
    { label: 'Dictionary', route: '/dictionary', iconName: 'book-open' },
    { label: 'Games', route: '/games', iconName: 'gamepad' },
    { label: 'Settings', route: '/settings', iconName: 'cog' },
    { label: 'Profile', route: '/profile', iconName: 'user' },
  ]

  public readonly orientation = input.required<'horizontal' | 'vertical'>();

  public readonly buttonsIconsPosition = input.required<ButtonIconPosition>();

  public readonly buttonsContentAlign = input.required<ButtonContentAlign>();

  public readonly buttonsPaddingX = input.required<WhitespaceSize>();
}
