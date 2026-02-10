import { Injectable } from '@angular/core';
import { NavPrimaryItem } from '../abstract/NavPrimaryItem';

@Injectable({
  providedIn: 'root',
})
export class NavPrimaryItemsService {
  private _itemsNullable?: NavPrimaryItem[]

  public get items(): NavPrimaryItem[] {
    if (!this._itemsNullable) {
      throw new Error('Items are not set yet!')
    }

    return this._itemsNullable
  }

  public set items(val: NavPrimaryItem[]) {
    if (this._itemsNullable) {
      throw new Error('Items are set already!')
    }

    this._itemsNullable = val
  }
}
