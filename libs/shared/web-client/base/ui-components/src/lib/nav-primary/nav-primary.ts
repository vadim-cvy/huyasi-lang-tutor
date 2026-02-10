import { Component, inject, input } from '@angular/core';
import { Button } from '../button/button';
import { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import { WhitespaceSize } from '@huyasi/shared-web-client-base-ui-design';
import { NavPrimaryItemsService } from './services/nav-primary-items.service';

@Component({
  selector: 'shared-base-nav-primary',
  imports: [Button],
  templateUrl: './nav-primary.html',
  styleUrl: './nav-primary.scss',
})
export class NavPrimary {
  private readonly navPrimaryItemsService = inject(NavPrimaryItemsService)

  public readonly navItems = this.navPrimaryItemsService.items.asReadonly()

  public readonly orientation = input.required<'horizontal' | 'vertical'>();

  public readonly buttonsIconsPosition = input.required<ButtonIconPosition>();

  public readonly buttonsContentAlign = input.required<ButtonContentAlign>();

  public readonly buttonsPaddingX = input.required<WhitespaceSize>();
}
