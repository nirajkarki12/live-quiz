import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
// Services
import { LoginService } from './services/login.service';
// Components
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService,
  ],
})
export class LoginModule { }
