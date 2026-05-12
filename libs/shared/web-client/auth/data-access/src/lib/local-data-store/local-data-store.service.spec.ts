import { TestBed } from '@angular/core/testing';

import { SharedAuthLocalDataStoreService } from './local-data-store.service';

describe('SharedAuthLocalDataStoreService', () => {
  let service: SharedAuthLocalDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAuthLocalDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
