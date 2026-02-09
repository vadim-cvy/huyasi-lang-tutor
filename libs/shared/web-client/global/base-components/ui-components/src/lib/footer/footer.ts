import { Component } from '@angular/core';
import { NavPrimary } from '../nav-primary/nav-primary';

@Component({
  selector: 'web-public-base-components-footer',
  imports: [NavPrimary],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
