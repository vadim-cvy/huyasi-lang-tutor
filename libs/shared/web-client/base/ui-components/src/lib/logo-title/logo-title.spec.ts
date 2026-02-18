import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoTitle } from './logo-title';
import { provideRouter } from '@angular/router';
import { LogoTitleContentService } from './services/logo-title-content.service';
import { LogoTitleContentServiceStub } from './services/logo-title-content.service.stub';

describe('LogoTitle', () => {
  let component: LogoTitle;
  let fixture: ComponentFixture<LogoTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoTitle],
      providers: [
        provideRouter([]),
        { provide: LogoTitleContentService, useClass: LogoTitleContentServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
