import type { LogoTitleContent } from '../abstract/LogoTitleContent';
import type { ILogoTitleContentService } from './logo-title-content.service.interface';

export class LogoTitleContentServiceStub implements ILogoTitleContentService {
  public content: LogoTitleContent = {
    logoSrc: '',
    text: {
      line1: '',
      line2: '',
    },
  };
}
