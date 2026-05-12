import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { sharedAuthBackendPaths } from '@huyasi/shared-web-client-auth-utils';
import { Button } from '@huyasi/shared-web-client-base-ui-components';

@Component({
  selector: 'shared-auth-logout-confirmation',
  imports: [Button],
  templateUrl: './logout-confirmation.html',
  styleUrl: './logout-confirmation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutConfirmation {
  private readonly location = inject(Location);

  public readonly userNickname = input.required<string>();

  public readonly logoutUrl = signal(sharedAuthBackendPaths.logout);

  public goBack(): void {
    // FIXME: if the logout confirmation page was accessed directly (or linked from other site) - where location.back() will lead? to the home page?
    this.location.back();
  }
}
