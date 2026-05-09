import type { Route } from '@angular/router';
import { provideAuthRoutes } from '@huyasi/shared-web-client-auth-feature';

export const appRoutes: Route[] = [...provideAuthRoutes()];
