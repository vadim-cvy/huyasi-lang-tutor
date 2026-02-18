import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideRouter } from '@angular/router';
import { LogoTitleContentService } from '../logo-title/services/logo-title-content.service';
import { LogoTitleContentServiceStub } from '../logo-title/services/logo-title-content.service.stub';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: LogoTitleContentService, useClass: LogoTitleContentServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
