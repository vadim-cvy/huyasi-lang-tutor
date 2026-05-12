import type { Route } from '@angular/router';
import { provideSharedAuthRoutes } from '@huyasi/shared-web-client-auth-feature';

export const appRoutes: Route[] = [
  ...provideSharedAuthRoutes({
    loadLoginOrRegisterComponent: async () =>
      import('@huyasi/public-web-client-auth-ui-components').then((m) => m.LoginOrRegister),
  }),
];
