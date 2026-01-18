import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, fromEvent, map, startWith } from 'rxjs';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'web-public-base-components-page',
  imports: [Header, Sidebar, Footer],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {
  private readonly destroyRef = inject(DestroyRef);

  public readonly isMinimalistic = input<boolean>(false);

  public readonly isSidebarBreakpointMatch = signal<boolean>(true);
  public readonly isFooterBreakpointMatch = signal<boolean>(true);

  constructor() {
    this.syncSidebarAndFooterVisibility();
  }

  private syncSidebarAndFooterVisibility(): void {
    const screenResize$ = fromEvent(window, 'resize')
      .pipe(
        auditTime(100),
        map(() => window.innerWidth),
        startWith(window.innerWidth),
        takeUntilDestroyed(this.destroyRef),
      )

    const footerBreakpointMaxVisiblePx = 959;

    screenResize$.subscribe(widthPx => {
      this.isFooterBreakpointMatch.set(widthPx <= footerBreakpointMaxVisiblePx);
      this.isSidebarBreakpointMatch.set(!this.isFooterBreakpointMatch());
    });
  }
}
