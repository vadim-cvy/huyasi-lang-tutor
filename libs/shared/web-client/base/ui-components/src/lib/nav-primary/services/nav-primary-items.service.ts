import { Injectable } from '@angular/core';

import type { NavPrimaryItem } from '../abstract/NavPrimaryItem';
import type { INavPrimaryItemsService } from './nav-primary-items.service.interface';

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

  public set items(val: readonly Readonly<NavPrimaryItem>[]) {
    if (this._itemsNullable) {
      throw new Error('Items are set already!');
    }

    this._itemsNullable = [...val];
  }
}
