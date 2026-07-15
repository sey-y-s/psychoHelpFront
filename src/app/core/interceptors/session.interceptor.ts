import { HttpInterceptorFn } from '@angular/common/http';

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  // Pour inclure les cookies de session dans toutes les requêtes
  const reqWithCredentials = req.clone({ withCredentials: true });
  return next(reqWithCredentials);
};