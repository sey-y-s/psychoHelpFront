import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roleAttendu = route.data['role'];

  if (auth.aRole(roleAttendu)) return true;
  router.navigate(['/psychologues']);
  return false;
};