import { Component, inject, input } from '@angular/core';
import { WhitespaceSize } from '@huyasi/shared-web-client-base-ui-design';

import { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import { Button } from '../button/button';
import { NavPrimaryItem } from './abstract/NavPrimaryItem';
import { NavPrimaryItemsService } from './services/nav-primary-items.service';

@Component({
  selector: 'shared-base-nav-primary',
  imports: [Button],
  templateUrl: './nav-primary.html',
  styleUrl: './nav-primary.scss',
})
export class NavPrimary {
  private readonly navPrimaryItemsService = inject(NavPrimaryItemsService);

  public get navItems(): NavPrimaryItem[] {
    return this.navPrimaryItemsService.items;
  }

  public readonly orientation = input.required<'horizontal' | 'vertical'>();

  public readonly buttonsIconsPosition = input.required<ButtonIconPosition>();

  public readonly buttonsContentAlign = input.required<ButtonContentAlign>();

  public readonly buttonsPaddingX = input.required<WhitespaceSize>();
}
