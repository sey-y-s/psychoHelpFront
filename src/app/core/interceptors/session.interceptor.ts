import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {tap} from "rxjs";

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  // Pour inclure les cookies de session dans toutes les requêtes
  const reqWithCredentials = req.clone({ withCredentials: true });
  return next(reqWithCredentials);

};