import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { erreurInterceptor } from './core/interceptors/erreur.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(),
    provideHttpClient(withInterceptors([erreurInterceptor])),
    provideAnimations()
  ]
};