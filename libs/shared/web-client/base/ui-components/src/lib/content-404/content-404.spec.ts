import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Content404 } from './content-404';
import { provideRouter } from '@angular/router';

describe('Content404', () => {
  let component: Content404;
  let fixture: ComponentFixture<Content404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [Content404],
    }).compileComponents();

    fixture = TestBed.createComponent(Content404);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
