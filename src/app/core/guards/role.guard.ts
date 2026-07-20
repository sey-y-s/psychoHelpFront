// import { inject } from '@angular/core';
// import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   const roleAttendu = route.data['role'];

//   if (auth.aRole(roleAttendu)) return true;
//   router.navigate(['/psychologues']);
//   return false;
// };



import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roleAttendu = route.data['role'];

  // 1. On attend que Spring Boot ait répondu (sessionLoading$ passe à false)
  return auth.sessionLoading$.pipe(
    filter(loading => !loading),
    take(1),
    map(() => {
      // 2. Une fois les données reçues, on vérifie le rôle
      if (auth.estConnecte() && auth.aRole(roleAttendu)) {
        return true;
      }

      // 3. Si pas connecté ou mauvais rôle, redirection vers le login ou l'accueil
      router.navigate(['/login']);
      return false;
    })
  );
};