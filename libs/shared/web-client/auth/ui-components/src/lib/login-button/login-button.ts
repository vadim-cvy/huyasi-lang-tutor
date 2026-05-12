import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { sharedAuthBackendPaths } from '@huyasi/shared-web-client-auth-utils';
import { Button } from '@huyasi/shared-web-client-base-ui-components';

@Component({
  selector: 'shared-auth-login-button',
  imports: [Button],
  templateUrl: './login-button.html',
  styleUrl: './login-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButton {
  public readonly loginBackendUrl = signal(sharedAuthBackendPaths.login);
}
