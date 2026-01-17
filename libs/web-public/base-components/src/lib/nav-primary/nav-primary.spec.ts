import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavPrimary } from './nav-primary';

describe('NavPrimary', () => {
  let component: NavPrimary;
  let fixture: ComponentFixture<NavPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPrimary],
    }).compileComponents();

    fixture = TestBed.createComponent(NavPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
