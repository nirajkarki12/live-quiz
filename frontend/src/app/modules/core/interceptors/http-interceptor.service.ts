import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { AppRoutes } from 'src/app/constants/app-routes';
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  clonedRequest: HttpRequest<any>;

  constructor(
    private router: Router,
    private injector: Injector,
    private authService: AuthService,
    private toastr: ValidatorMessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthService);
    this.clonedRequest = request.clone({
      setHeaders: { 'X-Authorization': `${this.authService.getAuthToken()}` }
    });
    return next.handle(this.clonedRequest)
    .do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            if (event.headers.get('X-Authorization')) {
              this.authService.setAuthToken(event.headers.get('X-Authorization'));
              this.clonedRequest = request.clone({
                setHeaders: { 'X-Authorization': `${event.headers.get('X-Authorization')}` }
              });
            }
        } else {
          // this.authService.removeAuthToken();
        }
      },
      (errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          if (errorResponse.status === 401 || errorResponse.status === 400) {
            // this.toastr.showMessage('Session Timeout', 'error');
            this.authService.removeAuthToken();
            this.router.navigate([AppRoutes.login]);
          } else if (errorResponse.status === 500 && errorResponse.error.message === 'Token has expired and can no longer be refreshed') {
            this.toastr.showMessage(errorResponse.error.message, 'error');
            this.authService.removeAuthToken();
            this.router.navigate([AppRoutes.login]);
          }
        }
      }
    );
  }
}
