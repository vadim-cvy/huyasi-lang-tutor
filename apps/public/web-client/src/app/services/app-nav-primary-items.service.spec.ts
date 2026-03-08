import { TestBed } from '@angular/core/testing';

import { AppNavPrimaryItemsService } from './app-nav-primary-items.service';

describe('AppNavPrimaryItemsService', () => {
  let service: AppNavPrimaryItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppNavPrimaryItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
