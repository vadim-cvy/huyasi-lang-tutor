import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import type { ColorScheme } from './abstract/ColorScheme';
import { ColorSchemeToggle } from './color-scheme-toggle';
import { ColorSchemeToggleService } from './services/color-scheme-toggle.service';

/**
 * window.matchMedia is undefined in the test environment, while the
 * ColorSchemeToggleService (which is a dependency of the ColorSchemeToggle component) uses it.
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

describe('ColorSchemeToggle', () => {
  let component: ColorSchemeToggle;
  let fixture: ComponentFixture<ColorSchemeToggle>;
  let colorSchemeService: ColorSchemeToggleService;

  const getScheme = (): ColorScheme => {
    TestBed.tick();
    return colorSchemeService.scheme();
  };

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [ColorSchemeToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorSchemeToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();

    colorSchemeService = TestBed.inject(ColorSchemeToggleService);
    TestBed.tick();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on click', () => {
    let button: HTMLButtonElement;

    const clickButton = (): void => {
      button.click();
      fixture.detectChanges();
    };

    beforeEach(() => {
      const nativeElement = fixture.nativeElement as unknown;

      if (!(nativeElement instanceof HTMLElement)) {
        throw new Error('Expected nativeElement to be an instance of HTMLElement');
      }

      const _button = nativeElement.querySelector('button');

      if (!(_button instanceof HTMLButtonElement)) {
        throw new Error('Expected button to be an instance of HTMLButtonElement');
      }

      button = _button;
    });

    it('should change the color scheme', () => {
      const initialScheme = getScheme();

      clickButton();

      const schemeAfterClick = getScheme();

      expect(schemeAfterClick).not.toBe(initialScheme);
    });

    it('should change the icon', () => {
      const getIconName = (): string => {
        const icon = button.querySelector('svg');

        if (!(icon instanceof SVGSVGElement)) {
          throw new Error('Expected icon to be an instance of SVGSVGElement');
        }

        const iconName = icon.dataset['icon'];

        if (typeof iconName !== 'string' || iconName.length === 0) {
          throw new Error('Icon name is missing or invalid!');
        }

        return iconName;
      };

      const initialIconName = getIconName();

      clickButton();

      const iconNameAfterClick = getIconName();

      expect(iconNameAfterClick).not.toBe(initialIconName);
    });

    it('should change the aria-label', () => {
      const getAriaLabel = (): string => {
        const ariaLabel = button.getAttribute('aria-label');

        if (typeof ariaLabel !== 'string' || ariaLabel.length === 0) {
          throw new Error('Aria-label is missing or invalid!');
        }

        return ariaLabel;
      };

      const getExpectedAriaLabel = (): string => {
        return `Switch to ${colorSchemeService.scheme() === 'dark' ? 'light' : 'dark'} mode`;
      };

      expect(getAriaLabel()).toBe(getExpectedAriaLabel());

      clickButton();

      expect(getAriaLabel()).toBe(getExpectedAriaLabel());
    });
  });
});
