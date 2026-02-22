import type { ComponentFixture} from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavPrimaryItemsService } from '../nav-primary/services/nav-primary-items.service';
import { NavPrimaryItemsServiceStub } from '../nav-primary/services/nav-primary-items.service.stub';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        provideRouter([]),
        { provide: NavPrimaryItemsService, useClass: NavPrimaryItemsServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
