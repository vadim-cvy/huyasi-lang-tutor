import { Component, computed, signal } from '@angular/core';
import { NavPrimary } from '../nav-primary/nav-primary';
import { Button } from '../button/button';
import { ButtonIconPosition } from '../button/abstract/ButtonIconPosition';
import { ButtonContentAlign } from '../button/abstract/ButtonContentAlign';
import { WhitespaceSize } from '@huyasi/web-public-shared-styles';

@Component({
  selector: 'web-public-base-components-sidebar',
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
