import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import type { ReadonlyDeep } from 'type-fest';

@Injectable({
  providedIn: 'root',
})
export class SidebarToggleService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly storageKey = 'isSidebarExpanded';

  /**
   * Looks for the value stored in a persistent storage
   */
  private get storedVal(): boolean | null {
    const val = localStorage.getItem(this.storageKey);

    return SidebarToggleService.parseVal(val);
  }

  /**
   * Stores the value in a persistent storage.
   */
  private set storedVal(val: boolean | null) {
    if (val === null) {
      localStorage.removeItem(this.storageKey);
    } else {
      localStorage.setItem(this.storageKey, val.toString());
    }
  }

  /**
   * Reactive value.
   *
   * Is synced with persistent storage value.
   * @see initSyncWithCurTabPersistentStorage
   * @see initSyncWithOtherTabsPersistentStorage
   */
  private readonly _isExpanded = signal<boolean>(
    SidebarToggleService.fallbackValWithDefault(this.storedVal),
  );

  /**
   * Readonly version of the value signal, for public usage.
   */
  public readonly isExpanded = this._isExpanded.asReadonly();

  public constructor() {
    this.initSyncWithCurTabPersistentStorage();
    this.initSyncWithOtherTabsPersistentStorage();
  }

  /**
   * Pushes changes of the reactive value to the persistent storage.
   */
  private initSyncWithCurTabPersistentStorage(): void {
    effect(() => (this.storedVal = this._isExpanded()));
  }

  /**
   * Pulls changes of the value from the persistent storage when it changes in other tabs.
   */
  private initSyncWithOtherTabsPersistentStorage(): void {
    const onStorageCb = (event: ReadonlyDeep<StorageEvent>): void => {
      if (event.key !== this.storageKey) {
        return;
      }

      const newValRaw = event.newValue;
      const newValParsed = SidebarToggleService.parseVal(newValRaw);

      if (newValParsed === null && newValRaw !== null) {
        throw new Error(`Invalid value in persistent storage: ${newValRaw}`);
      }

      this._isExpanded.set(SidebarToggleService.fallbackValWithDefault(newValParsed));
    };

    window.addEventListener('storage', onStorageCb);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('storage', onStorageCb);
    });
  }

  /**
   * Toggles the value between true and false.
   */
  public toggle(): void {
    this._isExpanded.update((curr) => !curr);
  }

  /**
   * Parses the value, ensuring it's valid.
   *
   * @param val - The value to parse as a value.
   * @returns The parsed value if valid, or null otherwise.
   */
  private static parseVal(val: unknown): boolean | null {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    return null;
  }

  /**
   * Returns the provided value if it's not null, otherwise returns a fallback value.
   */
  private static fallbackValWithDefault(valNullable: boolean | null): boolean {
    return valNullable ?? true;
  }
}
