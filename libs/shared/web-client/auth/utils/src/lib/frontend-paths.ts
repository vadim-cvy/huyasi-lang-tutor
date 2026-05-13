import type { Route } from '@angular/router';

export const sharedAuthFrontendPaths: Record<
  'loginOrRegister' | 'logoutConfirmation' | 'logoutResult',
  NonNullable<Route['path']>
> = {
  loginOrRegister: 'login',
  logoutConfirmation: 'logout-confirmation',
  logoutResult: 'logout-result',
};
