import { Injectable } from '@angular/core';
import { NavPrimaryItem } from '../abstract/NavPrimaryItem';

@Injectable({
  providedIn: 'root',
})
export class NavPrimaryItemsService {
  private _itemsNullable?: Readonly<Readonly<NavPrimaryItem>[]>

  public get items(): Readonly<Readonly<NavPrimaryItem>[]> {
    if (!this._itemsNullable) {
      throw new Error('Items are not set yet!')
    }

    return this._itemsNullable
  }

  public set items(val: Readonly<Readonly<NavPrimaryItem>[]>) {
    if (this._itemsNullable) {
      throw new Error('Items are set already!')
    }

    this._itemsNullable = val
  }
}
