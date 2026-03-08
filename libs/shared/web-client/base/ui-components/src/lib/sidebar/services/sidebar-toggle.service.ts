import { Injectable } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

@Injectable({
  providedIn: 'root',
})
export class SidebarToggleService {
  private readonly isExpandedStorageKey = 'isSidebarExpanded';

  private readonly isExpandedDefault = true;

  private readonly _isExpanded = injectLocalStorage<boolean>(this.isExpandedStorageKey, {
    defaultValue: this.isExpandedDefault,
    parse: (valJSON): boolean => {
      try {
        const val = JSON.parse(valJSON) as unknown;

        if (typeof val === 'boolean') {
          return val;
        }
      } catch (err) {
        console.warn(
          `Invalid ${this.isExpandedStorageKey} value in local storage: "${valJSON}".` +
            ` Err details: "${JSON.stringify(err)}".` +
            ' Falling back to default value.',
        );
      }

      return this.isExpandedDefault;
    },
  });

  /**
   * Readonly version of the value signal, for public usage.
   */
  public readonly isExpanded = this._isExpanded.asReadonly();

  /**
   * Toggles the value between true and false.
   */
  public toggleIsExpanded(): void {
    this._isExpanded.update((curr) => !curr);
  }
}
