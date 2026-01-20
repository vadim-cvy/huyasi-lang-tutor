import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoTitle } from './logo-title';

describe('LogoTitle', () => {
  let component: LogoTitle;
  let fixture: ComponentFixture<LogoTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the logo img', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const logoImg = fixture.nativeElement
      .querySelector('img.logo-title__logo') as HTMLImageElement | null;

    if (!logoImg) {
      expect(logoImg).toBeTruthy();
      return;
    }

    const checkIsLoadSuccess = await new Promise<boolean>(resolve => {
      // If already resolved
      if (logoImg.complete) {
        resolve(logoImg.naturalWidth > 0 ? true : false);
        return;
      }

      // Otherwise, wait for load/error events

      const fallbackTimeout = setTimeout(() => {
        cleanup();
        resolve(false);
      }, 3000);

      const onError = () => {
        cleanup();
        resolve(false);
      };

      const onSuccess = () => {
        cleanup();
        resolve(true);
      };

      const cleanup = () => {
        logoImg.removeEventListener('load', onSuccess);
        logoImg.removeEventListener('error', onError);
        clearTimeout(fallbackTimeout);
      };

      logoImg.addEventListener('load', onSuccess);
      logoImg.addEventListener('error', onError);
    });

    expect(checkIsLoadSuccess).toBe(true);
  });
});
