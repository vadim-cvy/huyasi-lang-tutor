import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { LogoutConfirmation } from './logout-confirmation';

describe('LogoutConfirmation', () => {
  let component: LogoutConfirmation;
  let fixture: ComponentFixture<LogoutConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
