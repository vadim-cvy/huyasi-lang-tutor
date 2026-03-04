import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import type { ReadonlyDeep } from 'type-fest';

import type { ColorScheme } from '../abstract/ColorScheme';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeToggleService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly storageKey = 'colorScheme';

  /**
   * Looks for the color scheme stored in a persistent storage
   */
  private get storedScheme(): ColorScheme | null {
    const val = localStorage.getItem(this.storageKey);

    return ColorSchemeToggleService.parseScheme(val);
  }

  /**
   * Stores the color scheme in a persistent storage.
   */
  private set storedScheme(scheme: ColorScheme | null) {
    if (scheme) {
      localStorage.setItem(this.storageKey, scheme);
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }

  /**
   * Reactive color scheme.
   *
   * Is synced with local storage value.
   * @see initSyncWithCurTabPersistentStorage
   * @see initSyncWithOtherTabsPersistentStorage
   */
  private readonly _scheme = signal<ColorScheme>(
    ColorSchemeToggleService.fallbackSchemeWithDefault(this.storedScheme),
  );

  /**
   * Readonly version of the color scheme signal, for public usage.
   */
  public readonly scheme = this._scheme.asReadonly();

  public constructor() {
    this.initSyncWithDOM();
    this.initSyncWithCurTabPersistentStorage();
    this.initSyncWithOtherTabsPersistentStorage();
  }

  /**
   * Sets a dataset attribute on the root document element with the reactive color scheme.
   */
  private initSyncWithDOM(): void {
    effect(() => (document.documentElement.dataset['colorScheme'] = this._scheme()));
  }

  /**
   * Pushes changes of the reactive color scheme to the persistent storage.
   */
  private initSyncWithCurTabPersistentStorage(): void {
    effect(() => (this.storedScheme = this._scheme()));
  }

  /**
   * Pulls changes of the color scheme from the persistent storage when it changes in other tabs.
   */
  private initSyncWithOtherTabsPersistentStorage(): void {
    const onStorageCb = (event: ReadonlyDeep<StorageEvent>): void => {
      if (event.key !== this.storageKey) {
        return;
      }

      const newValRaw = event.newValue;
      const newValParsed = ColorSchemeToggleService.parseScheme(newValRaw);

      if (newValParsed === null && newValRaw !== null) {
        throw new Error(`Invalid color scheme value in localStorage: ${newValRaw}`);
      }

      this._scheme.set(ColorSchemeToggleService.fallbackSchemeWithDefault(newValParsed));
    };

    window.addEventListener('storage', onStorageCb);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('storage', onStorageCb);
    });
  }

  /**
   * Toggles the color scheme between 'light' and 'dark'.
   */
  public toggle(): void {
    this._scheme.update((curr) => (curr === 'dark' ? 'light' : 'dark'));
  }

  /**
   * Parses the color scheme value, ensuring it's valid.
   *
   * @param maybeScheme - The value to parse as a color scheme.
   * @returns The parsed color scheme if valid, or null otherwise.
   */
  private static parseScheme(maybeScheme: unknown): ColorScheme | null {
    return maybeScheme === 'light' || maybeScheme === 'dark' ? maybeScheme : null;
  }

  /**
   * Returns the provided color scheme if it's not null, otherwise returns a fallback value.
   *
   * @param schemeNullable - The color scheme to check for nullability.
   * @return The provided color scheme if it's not null, otherwise the fallback color scheme based on system preferences.
   */
  private static fallbackSchemeWithDefault(schemeNullable: ColorScheme | null): ColorScheme {
    const systemScheme: ColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    return schemeNullable ?? systemScheme;
  }
}
