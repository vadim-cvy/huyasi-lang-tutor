import { inject, Injectable } from '@angular/core';
import { faBookOpen, faCog, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavPrimaryItemsService } from '@huyasi/shared-web-client-base-ui-components';

@Injectable({
  providedIn: 'root',
})
export class AppNavPrimaryItemsService {
  private readonly navPrimaryItemsService = inject(NavPrimaryItemsService);

  public setupItems(): void {
    this.navPrimaryItemsService.items = [
      { label: 'Dictionary', route: '/dictionary', iconDefinition: faBookOpen },
      { label: 'Games', route: '/games', iconDefinition: faGamepad },
      { label: 'Settings', route: '/settings', iconDefinition: faCog },
      { label: 'Profile', route: '/profile', iconDefinition: faUser },
    ];
  }
}
