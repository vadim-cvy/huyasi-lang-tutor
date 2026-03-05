import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import type { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import type { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import type { ButtonPaddingStrategy } from '../button/abstract/ButtonPaddingStrategy';
import type { ButtonSize } from '../button/abstract/ButtonSize';
import { Button } from '../button/button';
import { NavPrimary } from '../nav-primary/nav-primary';
import { SidebarToggleService } from './services/sidebar-toggle.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-sidebar',
  imports: [NavPrimary, Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly sidebarToggleService = inject(SidebarToggleService);

  public readonly isExpanded = this.sidebarToggleService.isExpanded;

  public readonly buttonsIconsPosition = computed<ButtonIconPosition>(() =>
    this.isExpanded() ? 'left' : 'top',
  );

  public readonly buttonsPaddingStrategy = computed<ButtonPaddingStrategy>(() =>
    this.isExpanded() ? 'rectangle' : 'square',
  );

  public readonly areButtonsDense = computed<boolean>(() => !this.isExpanded());

  public readonly buttonsSize = computed<ButtonSize>(() => (this.isExpanded() ? 'md' : 'sm'));

  public readonly buttonsContentAlign = computed<ButtonContentAlign>(() =>
    this.isExpanded() ? 'left' : 'center',
  );

  public readonly togglerButtonIconDefinition = computed<IconDefinition>(() =>
    this.isExpanded() ? faArrowLeft : faArrowRight,
  );

  public toggleIsExpanded(): void {
    this.sidebarToggleService.toggle();
  }
}
