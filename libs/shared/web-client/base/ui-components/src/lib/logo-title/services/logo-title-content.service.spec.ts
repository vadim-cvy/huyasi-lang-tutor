import { TestBed } from '@angular/core/testing';

import { LogoTitleContentService } from './logo-title-content.service';

describe('LogoTitleContentService', () => {
  let service: LogoTitleContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoTitleContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
