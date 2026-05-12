import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LoginButton } from '@huyasi/shared-web-client-auth-ui-components';
import { Button } from '@huyasi/shared-web-client-base-ui-components';

@Component({
  selector: 'lib-login-or-register',
  imports: [LoginButton, Button],
  templateUrl: './login-or-register.html',
  styleUrl: './login-or-register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginOrRegister {
  // FIXME: implement utils like with sharedAuth*Paths (with provide*() method)
  public readonly registerUrl = signal('');
}
