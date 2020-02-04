import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    AuthService,
    AuthGuard,
  ]
})
export class CoreModule { }
