import { TestBed } from '@angular/core/testing';

import { AppLogoTitleContentService } from './app-logo-title-content.service';

describe('AppLogoTitleContentService', () => {
  let service: AppLogoTitleContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLogoTitleContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
