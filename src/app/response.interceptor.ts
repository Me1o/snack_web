import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { DataService } from './data.service';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
export const responseInterceptorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const service = inject(DataService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        service.logout();
        localStorage.removeItem('profile');
      }
      return [];
    })
  );
};
