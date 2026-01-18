import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Page } from '@huyasi/web-public-base-components'

@Component({
  imports: [Page, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
