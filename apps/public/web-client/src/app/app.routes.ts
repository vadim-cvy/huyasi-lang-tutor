import type { Route } from '@angular/router';
import {
  sharedAuthGuardRoutes,
  sharedAuthProvideRoutes,
} from '@huyasi/shared-web-client-auth-feature';

const sharedAuthRoutes = sharedAuthProvideRoutes({
  loadLoginOrRegisterComponent: async () =>
    import('@huyasi/public-web-client-auth-ui-components').then((m) => m.LoginOrRegister),
});

export const appRoutes: Route[] = sharedAuthGuardRoutes({
  customPublicPaths: [
    // FIXME: whitelist register-form path here
  ],
  // FIXME: redirect from root route ('') to /games after games are implemented
  routes: [
    ...sharedAuthRoutes,
    // Add your routes here
  ],
});
