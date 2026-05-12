import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { sharedAuthFrontendPaths } from '@huyasi/shared-web-client-auth-utils';
import { Button } from '@huyasi/shared-web-client-base-ui-components';

@Component({
  selector: 'shared-auth-logout-button',
  imports: [Button],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutButton {
  public readonly logoutConfirmationUrl = signal(sharedAuthFrontendPaths.logoutConfirmation);

  public readonly iconDefinition = signal(faArrowRightFromBracket);
}
