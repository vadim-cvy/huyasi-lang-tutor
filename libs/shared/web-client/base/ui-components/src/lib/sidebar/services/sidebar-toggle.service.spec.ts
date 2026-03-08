import { TestBed } from '@angular/core/testing';
import type { ReadonlyDeep } from 'type-fest';

import { SidebarToggleService } from './sidebar-toggle.service';

const injectSidebarToggleService = (): SidebarToggleService => {
  const service = TestBed.inject(SidebarToggleService);

  TestBed.tick();

  return service;
};

const toggleIsExpandedAndTick = (service: ReadonlyDeep<SidebarToggleService>): void => {
  service.toggleIsExpanded();
  TestBed.tick();
};

describe('SidebarToggleService', () => {
  it('should be created', () => {
    expect(injectSidebarToggleService()).toBeTruthy();
  });

  describe('.toggleIsExpanded()', () => {
    it('should toggle from collapsed to expanded and vice versa', () => {
      const service = injectSidebarToggleService();

      const isExpanded1 = service.isExpanded();

      toggleIsExpandedAndTick(service);

      const isExpanded2 = service.isExpanded();

      expect(isExpanded1).not.toBe(isExpanded2);

      toggleIsExpandedAndTick(service);

      const isExpanded3 = service.isExpanded();

      expect(isExpanded3).toBe(isExpanded1);
    });
  });

  describe('persistence', () => {
    it('should restore the saved state in new instance', () => {
      const service1 = injectSidebarToggleService();

      toggleIsExpandedAndTick(service1);

      const isExpanded1 = service1.isExpanded();

      const service2 = injectSidebarToggleService();

      const isExpanded2 = service2.isExpanded();

      expect(isExpanded2).toBe(isExpanded1);
    });
  });
});
