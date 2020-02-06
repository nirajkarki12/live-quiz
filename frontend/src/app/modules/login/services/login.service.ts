import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConstants } from 'src/app/constants/api-constants';
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';
// Models
import { Profile } from 'src/app/modules/core/models/profile.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(userLoginModel: Profile): Promise<any> {
    console.log(ApiConstants);
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.AUTH +
      ApiConstants.LOGIN
      , userLoginModel,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
   }

   logout() {
     this.authService.removeAuthToken();
   }

   handleSuccess(response: any): Promise<any> {
    return Promise.resolve(response);

  }

  handleError(response: any): Promise<any> {
    return Promise.reject(response);
  }

}
