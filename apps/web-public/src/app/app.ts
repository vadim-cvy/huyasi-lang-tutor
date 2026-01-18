import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { Footer, Header, Sidebar } from '@huyasi/web-public-base-components'
import { auditTime, fromEvent, map, startWith } from 'rxjs';

@Component({
  imports: [RouterModule, Header, Sidebar, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private destroyRef = inject(DestroyRef);

  public isSidebarVisible = signal<boolean>(false);
  public isFooterVisible = signal<boolean>(false);

  constructor() {
    this.syncSidebarAndFooterVisibilityOnScreenWidthChange();
  }

  private syncSidebarAndFooterVisibilityOnScreenWidthChange(): void {
    const throttleMs = 100;

    const getScreenWidth = () => window.innerWidth;

    const resize$ = fromEvent(window, 'resize').pipe(
      auditTime(throttleMs),
      map(getScreenWidth),
      startWith(getScreenWidth()),
      takeUntilDestroyed(this.destroyRef),
    )

    resize$.subscribe(screenWidth => {
      this.isSidebarVisible.set(screenWidth >= 960);
      this.isFooterVisible.set(!this.isSidebarVisible());
    });
  }
}
