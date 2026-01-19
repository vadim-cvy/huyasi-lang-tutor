import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonContentAlign } from './abstract/ButtonContentAlign';
import { ButtonWidth } from './abstract/ButtonWidth';
import { ButtonIconPosition } from './abstract/ButtonIconPosition';
import { ButtonSize } from './abstract/ButtonSize';

@Component({
  selector: 'web-public-base-components-button',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public readonly link = input<{
    url: string;
    isRouterLinkActiveSync?: boolean;
  }>();

  public readonly icon = input<Readonly<{
    name: string;
    position: ButtonIconPosition;
  }>>();

  public readonly style = input.required<'transparent'>();

  public readonly width = input<ButtonWidth>('fitContent');

  public readonly contentAlign = input<ButtonContentAlign>('center');

  public readonly size = input<ButtonSize>('normal');
}
