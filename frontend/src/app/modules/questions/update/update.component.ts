import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
import { Subscription } from 'rxjs';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { QuestionFormService } from '../services/question-form.service';
import { QuestionService } from '../services/question.service';
// Models
import { Sets } from '../models/sets.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  questionForm: FormGroup;
  question: Question = new Question();
  buttonClicked = false;
  sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionFormService: QuestionFormService,
    private questionService: QuestionService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((data) => {
      this.question = data.question.data;
      this.questionForm = this.questionFormService.createForm(this.question, this.question.questionSet);
    });
  }

  update() {
    this.buttonClicked = true;
    this.questionService
      .update(this.questionForm.value)
      .then(response => {
        this.toastr.showMessage('Questions updated Successfully');
        this.router.navigate([AppRoutes.questions + '/list/' + this.question.questionSet.id]);
      })
      .catch(errorResponse => {
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

}

