import type { Route } from '@angular/router';
import { frontendAuthPaths } from '@huyasi/shared-web-client-auth-utils';

export const provideAuthRoutes =
  // FIXME: (loadLoginOrRegisterComponent: Route['loadComponent']):
  // FIXME: must be shown on isMinimalistic page
  (): Route[] => [
    // FIXME: implement
    // {
    //   path: frontendAuthPaths.loginOrRegister,
    //   loadComponent: loadLoginOrRegisterComponent,
    // },
    {
      path: frontendAuthPaths.logoutConfirmation,
      loadComponent: async () =>
        import('@huyasi/shared-web-client-auth-ui-components').then((m) => m.LogoutConfirmation),
      resolve: {
        // FIXME: use real data
        userNickname: () => 'placeholderNickname',
      },
    },
    // FIXME: must be shown on isMinimalistic page
    {
      path: frontendAuthPaths.logoutResult,
      loadComponent: async () =>
        import('@huyasi/shared-web-client-auth-ui-components').then((m) => m.LogoutResult),
    },
  ];
