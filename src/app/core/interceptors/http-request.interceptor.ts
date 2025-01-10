import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@shared/services/loading.service';
import { finalize } from 'rxjs';

let totalRequests: number = 0;

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingSrv: LoadingService = inject(LoadingService);

  totalRequests++;
  loadingSrv.setLoading(true);

  return next(req).pipe(
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) loadingSrv.setLoading(false);
    })
  );
};