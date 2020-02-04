import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
// Models
import { Profile } from 'src/app/modules/core/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  constructor(
      private fb: FormBuilder,
  ) {}

  createForm(user: Profile) {
    return this.fb.group({
        email: [user.email, [Validators.required, CustomValidators.email]],
        password: ['', [Validators.required, CustomValidators.rangeLength([6, 20])]],
      });
  }

}
