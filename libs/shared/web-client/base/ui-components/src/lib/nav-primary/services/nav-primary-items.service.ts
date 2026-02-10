import { Injectable, signal } from '@angular/core';
import { NavPrimaryItem } from '../abstract/NavPrimaryItem';

@Injectable({
  providedIn: 'root',
})
export class NavPrimaryItemsService {
  public readonly items = signal<NavPrimaryItem[]>([]);
}
