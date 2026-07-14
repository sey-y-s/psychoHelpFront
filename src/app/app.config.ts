import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { sessionInterceptor } from './core/interceptors/session.interceptor';
import { erreurInterceptor } from './core/interceptors/erreur.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([sessionInterceptor, erreurInterceptor])),
  ]
};