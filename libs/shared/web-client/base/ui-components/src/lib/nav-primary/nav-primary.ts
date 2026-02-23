import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { WhitespaceSize } from '@huyasi/shared-web-client-base-ui-design';

import type { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import type { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import { Button } from '../button/button';
import type { NavPrimaryItem } from './abstract/NavPrimaryItem';
import { NavPrimaryItemsService } from './services/nav-primary-items.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
