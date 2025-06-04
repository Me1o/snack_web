import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { DataService } from './data.service';
import { inject } from '@angular/core';
export const responseInterceptorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const service = inject(DataService);
  const e = next(req).pipe();
  e.subscribe((ev) => {
    console.log((ev as any).status);
    if ((ev as any).status == '401') service.logout();
  });
  return e;
};
