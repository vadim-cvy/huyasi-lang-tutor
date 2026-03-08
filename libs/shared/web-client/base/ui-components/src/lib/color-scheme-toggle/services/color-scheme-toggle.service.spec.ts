import { TestBed } from '@angular/core/testing';
import type { ReadonlyDeep } from 'type-fest';

import { ColorSchemeToggleService } from './color-scheme-toggle.service';

const stubMatchMedia = ({ isDark }: ReadonlyDeep<{ isDark: boolean }>): void => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn(
      (query: string): Pick<MediaQueryList, 'matches'> => ({
        matches: query === '(prefers-color-scheme: dark)' ? isDark : false,
      }),
    ),
    writable: true,
    configurable: true,
  });
};

const injectColorSchemeToggleService = (): ColorSchemeToggleService => {
  const service = TestBed.inject(ColorSchemeToggleService);

  TestBed.tick();

  return service;
};

const toggleSchemeAndTick = (service: ReadonlyDeep<ColorSchemeToggleService>): void => {
  service.toggleScheme();
  TestBed.tick();
};

describe('ColorSchemeToggleService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset['colorScheme'] = '';

    TestBed.configureTestingModule({});

    /**
     * We cant inject the ColorSchemeToggleService in the beforeEach, because we
     * need to stub the matchMedia before the service is instantiated, and we have
     * different test cases requiring different matchMedia stubs. So we will inject
     * the service in each test case instead.
     */
  });

  describe('first initialization', () => {
    it('should be created', () => {
      /**
       * We need to stub the matchMedia with any value here to avoid "window.matchMedia
       * is not a function" error.
       */
      stubMatchMedia({ isDark: false });

      const service = injectColorSchemeToggleService();

      expect(service).toBeTruthy();
    });

    it('should use light scheme when system preference is light', () => {
      stubMatchMedia({ isDark: false });

      const service = injectColorSchemeToggleService();

      expect(service.scheme()).toBe('light');
    });

    it('should use dark scheme when system preference is dark', () => {
      stubMatchMedia({ isDark: true });

      const service = injectColorSchemeToggleService();

      expect(service.scheme()).toBe('dark');
    });
  });

  describe('.toggleScheme()', () => {
    it('should toggle from light to dark', () => {
      stubMatchMedia({ isDark: false });

      const service = injectColorSchemeToggleService();

      toggleSchemeAndTick(service);

      expect(service.scheme()).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      stubMatchMedia({ isDark: true });

      const service = injectColorSchemeToggleService();

      toggleSchemeAndTick(service);

      expect(service.scheme()).toBe('light');
    });

    it('should update the document dataset attribute', () => {
      stubMatchMedia({ isDark: false });

      const service = injectColorSchemeToggleService();

      expect(document.documentElement.dataset['colorScheme']).toBe('light');

      toggleSchemeAndTick(service);

      expect(document.documentElement.dataset['colorScheme']).toBe('dark');
    });
  });

  describe('persistence', () => {
    it('should restore the saved scheme in new instance', () => {
      stubMatchMedia({ isDark: false });

      const service1 = injectColorSchemeToggleService();

      toggleSchemeAndTick(service1);

      const service2 = injectColorSchemeToggleService();

      expect(service2.scheme()).toBe('dark');
    });
  });
});
