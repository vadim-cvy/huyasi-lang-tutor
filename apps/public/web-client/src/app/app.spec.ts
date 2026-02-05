import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
