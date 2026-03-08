import { inject, Injectable } from '@angular/core';
import { LogoTitleContentService } from '@huyasi/shared-web-client-base-ui-components';

// TODO: use svg logo instead of png for better quality and performance
import logoSrc from '../assets/img/logo.png';

@Injectable({
  providedIn: 'root',
})
export class AppLogoTitleContentService {
  private readonly logoTitleContentService = inject(LogoTitleContentService);

  public setupContent(): void {
    this.logoTitleContentService.content = {
      logoSrc,
      text: {
        line1: 'Huyasi',
        line2: 'Lang Tutor',
      },
    };
  }
}
