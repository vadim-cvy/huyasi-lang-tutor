import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavPrimaryItemsService } from '../nav-primary/services/nav-primary-items.service';
import { NavPrimaryItemsServiceStub } from '../nav-primary/services/nav-primary-items.service.stub';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let sidebarToggleService: SidebarToggleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([]),
        { provide: NavPrimaryItemsService, useClass: NavPrimaryItemsServiceStub },
      ],
    }).compileComponents();

    sidebarToggleService = TestBed.inject(SidebarToggleService);

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on toggle button click', () => {
    let toggleButton: HTMLButtonElement;

    const clickButton = (): void => {
      toggleButton.click();
      fixture.detectChanges();
    };

    beforeEach(() => {
      const nativeElement = fixture.nativeElement as unknown;

      if (!(nativeElement instanceof HTMLElement)) {
        throw new Error('Expected nativeElement to be an instance of HTMLElement');
      }

      const _toggleButton = nativeElement.querySelector('.sidebar__toggle-button button');

      if (!(_toggleButton instanceof HTMLButtonElement)) {
        throw new Error('Expected button to be an instance of HTMLButtonElement');
      }

      toggleButton = _toggleButton;
    });

    it('should change the button icon', () => {
      const getIconName = (): string => {
        const icon = toggleButton.querySelector('svg');

        if (!(icon instanceof SVGSVGElement)) {
          throw new Error('Expected icon to be an instance of SVGSVGElement');
        }

        const iconName = icon.dataset['icon'];

        if (typeof iconName !== 'string' || iconName.length === 0) {
          throw new Error('Icon name is missing or invalid!');
        }

        return iconName;
      };

      const initialIconName = getIconName();

      clickButton();

      const iconNameAfterClick = getIconName();

      expect(iconNameAfterClick).not.toBe(initialIconName);
    });

    it('should change the button label', () => {
      const getLabel = (): string => {
        const label = toggleButton.querySelector('.button__content');

        if (!(label instanceof HTMLElement)) {
          throw new Error('Expected label to be an instance of HTMLElement');
        }

        return label.textContent.trim();
      };

      const getExpectedLabel = (): string =>
        sidebarToggleService.isExpanded() ? 'Collapse' : 'Expand';

      expect(getLabel()).toBe(getExpectedLabel());

      clickButton();

      expect(getLabel()).toBe(getExpectedLabel());
    });
  });
});
