import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {tap} from "rxjs";

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  //INFOS AVANT CREDENTIALS
  const reqWithCredentials = req.clone({withCredentials: true});
  return next(reqWithCredentials);

};