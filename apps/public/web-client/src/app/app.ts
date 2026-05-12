import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutButton } from '@huyasi/shared-web-client-auth-ui-components';
import { Page } from '@huyasi/shared-web-client-base-ui-components';

import { AppLogoTitleContentService } from './services/app-logo-title-content.service';
import { AppNavPrimaryItemsService } from './services/app-nav-primary-items.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Page, RouterModule, LogoutButton],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly appNavPrimaryItemsService = inject(AppNavPrimaryItemsService);

  private readonly appLogoTitleContentService = inject(AppLogoTitleContentService);

  public ngOnInit(): void {
    this.appNavPrimaryItemsService.setupItems();
    this.appLogoTitleContentService.setupContent();
  }
}
