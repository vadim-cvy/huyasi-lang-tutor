import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutResult } from './logout-result';

describe('LogoutResult', () => {
  let component: LogoutResult;
  let fixture: ComponentFixture<LogoutResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutResult],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
