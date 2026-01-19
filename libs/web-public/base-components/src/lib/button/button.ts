import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    position: 'left' | 'right' | 'top';
  }>>();

  public readonly style = input.required<'transparent'>();
}
