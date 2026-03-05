import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../button';
import { ColorSchemeToggleService } from './services/color-scheme-toggle.service';

@Component({
  selector: 'shared-base-color-scheme-toggle',
  imports: [Button],
  templateUrl: './color-scheme-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSchemeToggle {
  private readonly colorSchemeToggleService = inject(ColorSchemeToggleService);

  public readonly colorSchemeIconDefinition = computed<IconDefinition>(() => {
    return this.colorSchemeToggleService.scheme() === 'dark' ? faMoon : faSun;
  });

  /**
   * Toggles the color scheme between 'light' and 'dark'.
   */
  public toggleScheme(): void {
    this.colorSchemeToggleService.toggleScheme();
  }
}
