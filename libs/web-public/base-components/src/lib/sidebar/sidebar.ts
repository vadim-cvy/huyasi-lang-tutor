import { Component, computed, signal } from '@angular/core';
import { NavPrimary } from '../nav-primary/nav-primary';
import { Button } from '../button/button';
import { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import { ButtonSize } from '../button/abstract/ButtonSize';

@Component({
  selector: 'web-public-base-components-sidebar',
  imports: [NavPrimary, Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public readonly isExpanded = signal(true);

  public readonly buttonsIconsPosition = computed<ButtonIconPosition>(() =>
    this.isExpanded() ? 'left' : 'top'
  );

  public readonly buttonsContentAlign = computed<ButtonContentAlign>(() =>
    this.isExpanded() ? 'left' : 'center'
  );

  public readonly buttonsSize = computed<ButtonSize>(() =>
    this.isExpanded() ? 'normal' : 'extraSmall'
  );
}
