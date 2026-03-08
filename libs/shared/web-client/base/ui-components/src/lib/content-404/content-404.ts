import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Button } from '../button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-content-404',
  imports: [Button],
  templateUrl: './content-404.html',
  styleUrl: './content-404.scss',
})
export class Content404 implements OnInit {
  public readonly buttonData = signal<{
    url: string;
    label: string;
  } | null>(null);

  public ngOnInit(): void {
    Content404.track();
    this.setupButton();
  }

  private static track(): void {
    // TODO: check if this can be caught by monitoring tools, and if not - add some custom tracking for it
    console.error('404: page not found');
  }

  private setupButton(): void {
    // TODO: change url to prev page (if user has some other pages in the history) + change label to "back"
    this.buttonData.set({ url: '/', label: 'Back to Home' });
  }
}
