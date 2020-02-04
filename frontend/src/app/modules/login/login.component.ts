import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { LoginFormService } from './forms/login-form.service';
import { LoginService } from './services/login.service';
// Models
import { Profile } from 'src/app/modules/core/models/profile.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: Profile = new Profile();

  loginForm: FormGroup;
  buttonClicked = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private loginFormService: LoginFormService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.loginFormService.createForm(this.user);
  }

  login() {
    this.buttonClicked = true;
    this.loginService
      .login(this.loginForm.value)
      .then(response => {
        this.toastr.showMessage('Successfully Logged In');
        this.router.navigate([AppRoutes.dashboard]);
      })
      .catch(errorResponse => {
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

}
