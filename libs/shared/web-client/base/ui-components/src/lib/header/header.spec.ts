import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogoTitleContentService } from '../logo-title/services/logo-title-content.service';
import { LogoTitleContentServiceStub } from '../logo-title/services/logo-title-content.service.stub';
import { Header } from './header';

/**
 * window.matchMedia is undefined in the test environment, while the
 * ColorSchemeToggleService (which is a dependency of the Header component) uses it.
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

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: LogoTitleContentService, useClass: LogoTitleContentServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
