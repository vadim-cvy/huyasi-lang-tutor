import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { breakpoints } from '@huyasi/shared-web-client-base-ui-design';
import { auditTime, fromEvent, map, startWith } from 'rxjs';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-page',
  imports: [Header, Sidebar, Footer],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  /**
   * When `true`, page is rendered in a minimalistic mode: without header, sidebar and footer.
   */
  public readonly isMinimalistic = input<boolean>(false);

  private readonly isSidebarBreakpointMatch = signal<boolean>(true);
  private readonly isFooterBreakpointMatch = signal<boolean>(true);

  public readonly isHeaderVisible = computed<boolean>(() => !this.isMinimalistic());

  public readonly isSidebarVisible = computed<boolean>(
    () => this.isSidebarBreakpointMatch() && !this.isMinimalistic(),
  );

  public readonly isFooterVisible = computed<boolean>(
    () => this.isFooterBreakpointMatch() && !this.isMinimalistic(),
  );

  public ngOnInit(): void {
    this.syncSidebarAndFooterVisibility();
  }

  /**
   * Syncs sidebar and footer visibility based on the screen width.
   *
   * Sidebar and footer are interchangeable and are never visible at the same time.
   */
  private syncSidebarAndFooterVisibility(): void {
    const auditTimeMs = 100;

    const screenResize$ = fromEvent(window, 'resize').pipe(
      auditTime(auditTimeMs),
      map(() => window.innerWidth),
      startWith(window.innerWidth),
      takeUntilDestroyed(this.destroyRef),
    );

    screenResize$.subscribe((widthPx) => {
      this.isFooterBreakpointMatch.set(widthPx <= breakpoints.sm);
      this.isSidebarBreakpointMatch.set(!this.isFooterBreakpointMatch());
    });
  }
}
