import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page } from './page';
import { provideRouter } from '@angular/router';
import { LogoTitleContentService } from '../logo-title/services/logo-title-content.service';
import { LogoTitleContentServiceStub } from '../logo-title/services/logo-title-content.service.stub';

describe('Page', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page],
      providers: [
        provideRouter([]),
        { provide: LogoTitleContentService, useClass: LogoTitleContentServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Page);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
