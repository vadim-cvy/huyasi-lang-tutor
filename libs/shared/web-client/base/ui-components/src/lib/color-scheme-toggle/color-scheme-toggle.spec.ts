import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { ColorSchemeToggle } from './color-scheme-toggle';

describe('ColorSchemeToggle', () => {
  let component: ColorSchemeToggle;
  let fixture: ComponentFixture<ColorSchemeToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSchemeToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorSchemeToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // FIXME: implement tests
});
