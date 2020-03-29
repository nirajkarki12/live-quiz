import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Api Constants
import { ApiConstants } from 'src/app/constants/api-constants';
import { Profile } from 'src/app/modules/core/models/profile.model';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  profileDetail: Profile = new Profile();
  profileDetailRxSubject: Subject<Profile> = new BehaviorSubject<Profile>(this.profileDetail);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ValidatorMessageService
  ) { }

  syncProfile() {
    this.profileDetailRxSubject.next(
      this.profileDetail
    );
  }

  getProfileRxSubject() {
    return this.profileDetailRxSubject.asObservable();
  }

  getAndSyncProfileDetail() {
    this.http.get<any>(ApiConstants.API_ENDPOINT + ApiConstants.AUTH + ApiConstants.USER)
      .subscribe(
        (successResponse) => {
          this.profileDetail = successResponse;
          this.syncProfile();
        }, (errorResponse) => {
            this.toastr.showMessage(errorResponse.error.message, 'error');
        });
  }
}
