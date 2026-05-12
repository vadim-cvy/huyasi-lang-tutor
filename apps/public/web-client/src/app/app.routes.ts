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
  pathsWhitelistCustom: [
    // FIXME: whitelist register-form path here
  ],
  routes: [
    {
      path: '',
      // FIXME: this is just a placeholder, we don't have a component for this at the moment, but sharedAuthGuardRoutes will throw an erorr without a route for a root path.
      redirectTo: '/placeholder',
      pathMatch: 'full',
    },
    ...sharedAuthRoutes,
    // Add your routes here
  ],
});
