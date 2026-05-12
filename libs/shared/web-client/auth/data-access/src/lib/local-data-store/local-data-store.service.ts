import { computed, Injectable } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

import { sharedAuthLocalDataSchema } from './local-data.schema';
import type { SharedAuthLocalData } from './local-data.type';

// FIXME: move to data-access lib
@Injectable({
  providedIn: 'root',
})
export class SharedAuthLocalDataStoreService {
  // FIXME: use same keys naming in other libs
  private readonly localStorageKey = 'shared/auth';

  private readonly valDefault: SharedAuthLocalData = {
    isLoggedIn: false,
  };

  private readonly val = injectLocalStorage<SharedAuthLocalData>(this.localStorageKey, {
    defaultValue: this.valDefault,
    parse: (valRaw): SharedAuthLocalData => {
      const val = sharedAuthLocalDataSchema.safeParse(JSON.parse(valRaw) as unknown);

      if (val.success) {
        return val.data;
      }

      if (valRaw) {
        console.warn(
          `Invalid ${this.localStorageKey} value in local storage: "${valRaw}".` +
            ` Err details: "${JSON.stringify(val.error)}".` +
            ' Falling back to default value.',
        );
      }

      return this.valDefault;
    },
  });

  public readonly isLoggedIn = computed(() => this.val().isLoggedIn);

  public setIsLoggedIn(isLoggedIn: boolean): void {
    this.val.update((val) => ({ ...val, isLoggedIn }));
  }
}
