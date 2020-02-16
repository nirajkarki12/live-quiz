import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { AppRoutes } from 'src/app/constants/app-routes';
import { QuestionService } from '../question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionDetailResolverService {

  constructor(
    private toastr: ValidatorMessageService,
    private router: Router,
    private questionService: QuestionService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.questionService.getQuestion(route.paramMap.get('id'))
      .catch((err) => {
        this.toastr.showMessage(err.error.message, 'error');
        this.router.navigate([AppRoutes.sets]);
      });
  }
}
