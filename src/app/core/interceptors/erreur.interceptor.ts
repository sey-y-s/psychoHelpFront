import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

export const erreurInterceptor: HttpInterceptorFn = (req, next) => {
  const notif = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(erreur => {
      if (erreur.status === 401) {    // Session expirée ou non connecté
        router.navigate(['/login']);
        notif.erreur('Session expirée, veuillez vous reconnecter');
      } else if (erreur.status === 403) {
        notif.erreur('Accès non autorisé');
      } else {
        const message = erreur.error?.message || erreur.message || 'Erreur serveur';
        notif.erreur(message);
      }
      return throwError(() => erreur);
    })
  );
};