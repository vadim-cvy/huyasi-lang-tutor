import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header, Sidebar } from '@huyasi/web-public-base-components'

@Component({
  imports: [RouterModule, Header, Sidebar],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
