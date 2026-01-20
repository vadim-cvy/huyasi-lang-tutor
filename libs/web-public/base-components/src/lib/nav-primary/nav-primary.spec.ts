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

    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.componentRef.setInput('buttonsIconsPosition', 'left');
    fixture.componentRef.setInput('buttonsContentAlign', 'center');
    fixture.componentRef.setInput('buttonsSize', 'normal');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
