import { effect, Injectable } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

import type { ColorScheme } from '../abstract/ColorScheme';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeToggleService {
  private readonly schemeStorageKey = 'colorScheme';

  private readonly schemeDefault: ColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';

  private readonly _scheme = injectLocalStorage<ColorScheme>(this.schemeStorageKey, {
    defaultValue: this.schemeDefault,
    parse: (valJSON): ColorScheme => {
      // FIXME: this will throw an error on app first run (we don't want it). Check how it is implented in libs\shared\web-client\auth\data-access\src\lib\local-data-store\local-data-store.service.ts and implement it the same way. Here and in any other libs
      try {
        const val = JSON.parse(valJSON) as unknown;

        if (val === 'light' || val === 'dark') {
          return val;
        }
      } catch (err) {
        console.warn(
          `Invalid ${this.schemeStorageKey} value in local storage: "${valJSON}".` +
            ` Err details: "${JSON.stringify(err)}".` +
            ' Falling back to default value.',
        );
      }

      return this.schemeDefault;
    },
  });

  /**
   * Readonly version of the color scheme signal, for public usage.
   */
  public readonly scheme = this._scheme.asReadonly();

  public constructor() {
    this.initSyncWithDOM();
  }

  /**
   * Sets a dataset attribute on the root document element with the reactive color scheme.
   */
  private initSyncWithDOM(): void {
    effect(() => (document.documentElement.dataset['colorScheme'] = this._scheme()));
  }

  /**
   * Toggles the color scheme between 'light' and 'dark'.
   */
  public toggleScheme(): void {
    this._scheme.update((curr) => (curr === 'dark' ? 'light' : 'dark'));
  }
}
