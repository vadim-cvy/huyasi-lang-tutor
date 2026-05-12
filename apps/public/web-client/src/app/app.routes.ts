import type { Route } from '@angular/router';
import { provideSharedAuthRoutes } from '@huyasi/shared-web-client-auth-feature';

export const appRoutes: Route[] = [...provideSharedAuthRoutes()];
