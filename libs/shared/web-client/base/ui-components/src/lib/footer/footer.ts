import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NavPrimary } from '../nav-primary/nav-primary';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-footer',
  imports: [NavPrimary],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
