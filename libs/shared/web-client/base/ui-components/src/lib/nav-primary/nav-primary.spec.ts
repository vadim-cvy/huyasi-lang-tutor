import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavPrimaryItemsServiceStub } from '../nav-primary/services/nav-primary-items.service.stub';
import { NavPrimary } from './nav-primary';
import { NavPrimaryItemsService } from './services/nav-primary-items.service';

describe('NavPrimary', () => {
  let component: NavPrimary;
  let fixture: ComponentFixture<NavPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPrimary],
      providers: [
        provideRouter([]),
        { provide: NavPrimaryItemsService, useClass: NavPrimaryItemsServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavPrimary);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.componentRef.setInput('buttonsIconsPosition', 'left');
    fixture.componentRef.setInput('buttonsContentAlign', 'center');
    fixture.componentRef.setInput('buttonsPaddingX', 'normal');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
