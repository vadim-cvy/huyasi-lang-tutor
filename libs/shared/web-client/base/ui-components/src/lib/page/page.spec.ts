import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogoTitleContentService } from '../logo-title/services/logo-title-content.service';
import { LogoTitleContentServiceStub } from '../logo-title/services/logo-title-content.service.stub';
import { NavPrimaryItemsService } from '../nav-primary/services/nav-primary-items.service';
import { NavPrimaryItemsServiceStub } from '../nav-primary/services/nav-primary-items.service.stub';
import { Page } from './page';

/**
 * window.matchMedia is undefined in the test environment, while the
 * ColorSchemeToggleService (which is a dependency of the Page component) uses it.
 *
 * This is a simple mock to prevent errors related to window.matchMedia.matches.
 */
const mockMatchMedia = (): void => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn(() => ({ matches: false })),
    writable: true,
    configurable: true,
  });
};

describe('Page', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [Page],
      providers: [
        provideRouter([]),
        { provide: LogoTitleContentService, useClass: LogoTitleContentServiceStub },
        { provide: NavPrimaryItemsService, useClass: NavPrimaryItemsServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Page);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
