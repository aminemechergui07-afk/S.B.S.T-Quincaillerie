import { HttpInterceptorFn } from '@angular/common/http';

export const interceptInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  const request = req.clone({
    setHeaders: {
      authorization: 'Bearer ' + token
    }
  });

  return next(request);
};
