import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { AppRoutes } from 'src/app/constants/app-routes';
import { SetsService } from '../sets.service';

@Injectable({
  providedIn: 'root'
})
export class SetsDetailResolverService {

  constructor(
    private setService: SetsService,
    private toastr: ValidatorMessageService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.setService.fetchSetsDetail(route.paramMap.get('id'))
      .catch((err) => {
        this.toastr.showMessage(err.error.message, 'error');
        this.router.navigate([AppRoutes.questions + '/' + AppRoutes.sets]);
      });
  }
}
