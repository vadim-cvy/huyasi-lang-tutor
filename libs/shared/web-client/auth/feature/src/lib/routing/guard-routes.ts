import { inject } from '@angular/core';
import type { Route } from '@angular/router';
import { type CanActivateFn, Router, type UrlTree } from '@angular/router';
import { SharedAuthLocalDataStoreService } from '@huyasi/shared-web-client-auth-data-access';
import { sharedAuthFrontendPaths } from '@huyasi/shared-web-client-auth-utils';

const sharedAuthValidatePathsPresentedInRoutes = (
  routes: Route[],
  pathsToMatch: Route['path'][],
) => {
  const routesPaths = routes.map((route) => route.path);

  pathsToMatch.forEach((pathToMatch) => {
    if (!routesPaths.includes(pathToMatch)) {
      throw new Error(
        `Route with path "${pathToMatch}" ${pathToMatch === '' ? '(root route)' : ''} not found.` +
          ` Routes paths: ${JSON.stringify(routesPaths)}`,
      );
    }
  });
};

const sharedAuthCreateGuard =
  (pathsWhitelist: Route['path'][]): CanActivateFn =>
  (route, state): true | UrlTree => {
    const sharedAuthLocalDataStoreService = inject(SharedAuthLocalDataStoreService);
    console.log('here');
    if (sharedAuthLocalDataStoreService.isLoggedIn()) {
      return true;
    }

    const router = inject(Router);

    const currentUrl = state.url;

    const currentPathWithoutLeadingSlash = currentUrl.split('?')[0].slice(1);

    if (pathsWhitelist.includes(currentPathWithoutLeadingSlash)) {
      return true;
    }

    return router.createUrlTree([sharedAuthFrontendPaths.loginOrRegister], {
      queryParams: {
        // FIXME: pass it to backend too
        returnUrl: currentUrl,
      },
    });
  };

const sharedAuthGuardRoute = (route: Route, guard: CanActivateFn): Route => {
  if (route.redirectTo) {
    return route;
  }

  const canActivate = [...(route.canActivate ? route.canActivate : []), guard];

  const canActivateChild = [...(route.canActivateChild ? route.canActivateChild : []), guard];

  return {
    ...route,
    canActivate,
    // FIXME: do we really need it, or canActivate will do the job?
    canActivateChild,
  };
};

export const sharedAuthGuardRoutes = ({
  routes,
  pathsWhitelistCustom,
}: {
  routes: Route[];
  pathsWhitelistCustom?: Route['path'][];
}): Route[] => {
  const pathsWhitelistPredefined = [
    sharedAuthFrontendPaths.loginOrRegister,
    sharedAuthFrontendPaths.logoutResult,
  ];

  const pathsWhitelistAll = [...(pathsWhitelistCustom ?? []), ...pathsWhitelistPredefined];

  sharedAuthValidatePathsPresentedInRoutes(routes, pathsWhitelistAll);

  // Check if root route exists
  sharedAuthValidatePathsPresentedInRoutes(routes, ['']);

  const authGuard = sharedAuthCreateGuard(pathsWhitelistAll);

  return routes.map((route) => sharedAuthGuardRoute(route, authGuard));
};
