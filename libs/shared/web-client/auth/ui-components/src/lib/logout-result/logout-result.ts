import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { frontendAuthPaths } from '@huyasi/shared-web-client-auth-utils';
import { Button } from '@huyasi/shared-web-client-base-ui-components';

@Component({
  selector: 'shared-auth-logout-result',
  imports: [Button],
  templateUrl: './logout-result.html',
  styleUrl: './logout-result.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutResult {
  public readonly loginOrRegisterUrl = signal(frontendAuthPaths.loginOrRegister);
}
