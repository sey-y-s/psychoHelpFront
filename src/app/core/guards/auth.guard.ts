import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // On écoute le statut du chargement de la session
  return auth.sessionLoading$.pipe(
    // On attend que sessionLoading devienne 'false' (la requête HTTP est terminée)
    filter(loading => !loading),
    // On prend cette première valeur stable et on arrête d'écouter (take 1)
    take(1),
    // Maintenant que l'utilisateur est potentiellement chargé, on vérifie son statut
    map(() => {
      if (auth.estConnecte()) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};