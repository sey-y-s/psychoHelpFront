import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

export const erreurInterceptor: HttpInterceptorFn = (req, next) => {
  const notif = inject(NotificationService);

  return next(req).pipe(
    catchError(erreur => {
      // TODO: Gérer cas par cas (401 redirection login, 403 page interdite, 404, 500)
      const message = erreur.error?.message || erreur.message || 'Erreur serveur';
      notif.erreur(message);
      return throwError(() => erreur);
    })
  );
};