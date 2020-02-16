import {Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { navItems } from 'src/app/_nav';

import { Subscription } from 'rxjs';

import { Profile } from 'src/app/modules/core/models/profile.model';
import { ProfileService } from 'src/app/modules/core/services/profile/profile.service';
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';
import { AppRoutes } from 'src/app/constants/app-routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  currentYear: string = moment().format('YYYY');

  public sidebarMinimized = false;
  public navItems = navItems;

  ownDetail: Profile = new Profile();
  ownDetailSubscription: Subscription;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileService.getAndSyncProfileDetail();
    this.ownDetailSubscription = this.profileService.getProfileRxSubject()
      .subscribe(adminInfo => {
        this.ownDetail = adminInfo;
      });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authService.removeAuthToken();
    this.router.navigate([AppRoutes.login]);
  }

  ngOnDestroy() {
    this.ownDetailSubscription.unsubscribe();
  }

}
