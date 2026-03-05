import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import type { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import type { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import type { ButtonPaddingStrategy } from '../button/abstract/ButtonPaddingStrategy';
import type { ButtonSize } from '../button/abstract/ButtonSize';
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

  public readonly buttonsPaddingStrategy = input.required<ButtonPaddingStrategy>();

  public readonly areButtonsDense = input.required<boolean>();

  public readonly buttonsSize = input.required<ButtonSize>();
}
