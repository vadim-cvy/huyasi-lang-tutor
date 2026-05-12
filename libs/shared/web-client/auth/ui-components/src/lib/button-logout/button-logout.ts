import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { sharedAuthFrontendPaths } from '@huyasi/shared-web-client-auth-utils';
import { Button } from '@huyasi/shared-web-client-base-ui-components';

@Component({
  selector: 'shared-auth-button-logout',
  imports: [Button],
  templateUrl: './button-logout.html',
  styleUrl: './button-logout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLogout {
  public readonly logoutConfirmationUrl = signal(sharedAuthFrontendPaths.logoutConfirmation);

  public readonly iconDefinition = signal(faArrowRightFromBracket);
}
