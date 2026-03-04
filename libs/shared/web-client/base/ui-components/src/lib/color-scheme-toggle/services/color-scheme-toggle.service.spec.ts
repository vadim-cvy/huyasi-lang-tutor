import { TestBed } from '@angular/core/testing';

import { ColorSchemeToggleService } from './color-scheme-toggle.service';

describe('ColorSchemeToggleService', () => {
  let service: ColorSchemeToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorSchemeToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // FIXME: implement tests
});
