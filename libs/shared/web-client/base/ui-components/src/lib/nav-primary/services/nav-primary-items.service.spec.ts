import { TestBed } from '@angular/core/testing';

import { NavPrimaryItemsService } from './nav-primary-items.service';

describe('NavPrimaryItemsService', () => {
  let service: NavPrimaryItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavPrimaryItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
