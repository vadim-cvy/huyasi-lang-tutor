import { inject, Injectable } from '@angular/core';
import { NavPrimaryItemsService } from '@huyasi/shared-web-client-base-ui-components';

@Injectable({
  providedIn: 'root',
})
export class AppNavPrimaryItemsService {
  private readonly navPrimaryItemsService = inject(NavPrimaryItemsService)

  public setupItems(): void {
    this.navPrimaryItemsService.items = [
      { label: 'Dictionary', route: '/dictionary', iconName: 'book-open' },
      { label: 'Games', route: '/games', iconName: 'gamepad' },
      { label: 'Settings', route: '/settings', iconName: 'cog' },
      { label: 'Profile', route: '/profile', iconName: 'user' },
    ]
  }
}
