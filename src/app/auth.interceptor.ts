import { HttpInterceptorFn } from '@angular/common/http';
import { DataService } from './data.service';
import { inject } from '@angular/core';
export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(DataService);
  const authToken = service.token;
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` },
  });
  return next(authReq);
};
