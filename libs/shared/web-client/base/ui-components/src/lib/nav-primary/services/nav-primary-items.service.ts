import { Injectable } from '@angular/core';

import type { NavPrimaryItem } from '../abstract/NavPrimaryItem';
import type { INavPrimaryItemsService } from './nav-primary-items.service.interface';

/**
 * Service for injecting items into NavPrimary component (from the apps).
 *
 * What's the purpose?:
 * NavPrimary component can be used in different apps (admin area, client area, etc),
 * each app has different navigation items, so we can't hardcode items in the component
 * itself and need to inject the items from the apps instead.
 */
@Injectable({
  providedIn: 'root',
})
export class NavPrimaryItemsService implements INavPrimaryItemsService {
  private _itemsNullable?: NavPrimaryItem[];

  public get items(): NavPrimaryItem[] {
    if (!this._itemsNullable) {
      throw new Error('Items are not set yet!');
    }

    return this._itemsNullable;
  }

  public set items(val: readonly NavPrimaryItem[]) {
    if (this._itemsNullable) {
      throw new Error('Items are set already!');
    }

    this._itemsNullable = [...val];
  }
}
