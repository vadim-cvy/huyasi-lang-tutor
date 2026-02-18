import { TestBed } from '@angular/core/testing';
import { LogoTitleContentService } from './logo-title-content.service';
import { LogoTitleContentServiceStub } from './logo-title-content.service.stub';

describe('LogoTitleContentService', () => {
  let service: LogoTitleContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LogoTitleContentService, useClass: LogoTitleContentServiceStub },
      ]
    });
    service = TestBed.inject(LogoTitleContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
