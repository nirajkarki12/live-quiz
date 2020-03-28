import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';

import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { SponsorService } from '../sponsor.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorDetailResolverService {

  constructor(
    private sponsorService: SponsorService,
    private toastr: ValidatorMessageService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.sponsorService.fetchDetail(route.paramMap.get('id'))
      .catch((err) => {
        this.toastr.showMessage(err.error.message, 'error');
        this.router.navigate([AppRoutes.sponsors]);
      });
  }
}
