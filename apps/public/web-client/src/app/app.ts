import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Page } from '@huyasi/shared-web-client-base-ui-components';
import { AppNavPrimaryItemsService } from './services/app-nav-primary-items.service';

@Component({
  imports: [Page, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly appNavPrimaryItemsService = inject(AppNavPrimaryItemsService)

  public ngOnInit(): void {
    this.appNavPrimaryItemsService.setupItems();
  }
}
