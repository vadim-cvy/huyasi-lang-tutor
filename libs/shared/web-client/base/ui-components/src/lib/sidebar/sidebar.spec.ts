import type { ComponentFixture} from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavPrimaryItemsService } from '../nav-primary/services/nav-primary-items.service';
import { NavPrimaryItemsServiceStub } from '../nav-primary/services/nav-primary-items.service.stub';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([]),
        { provide: NavPrimaryItemsService, useClass: NavPrimaryItemsServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
