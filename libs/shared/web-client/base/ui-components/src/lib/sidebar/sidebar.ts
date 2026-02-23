import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { WhitespaceSize } from '@huyasi/shared-web-client-base-ui-design';

import type { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import type { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import { Button } from '../button/button';
import { NavPrimary } from '../nav-primary/nav-primary';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-sidebar',
  imports: [NavPrimary, Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public readonly isExpanded = signal(true);

  public readonly buttonsIconsPosition = computed<ButtonIconPosition>(() =>
    this.isExpanded() ? 'left' : 'top',
  );

  public readonly buttonsContentAlign = computed<ButtonContentAlign>(() =>
    this.isExpanded() ? 'left' : 'center',
  );

  public readonly buttonsPaddingX = computed<WhitespaceSize>(() =>
    this.isExpanded() ? 'lg' : 'xs',
  );
}
