import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { QuestionFormService } from '../services/question-form.service';
import { QuestionService } from '../services/question.service';
// Models
import { Sets } from '../models/sets.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  questionForm: FormGroup;
  question: Question = new Question();
  buttonClicked: Boolean = false;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private questionFormService: QuestionFormService,
    private toastr: ValidatorMessageService,
  ) { }

  ngOnInit() {
    this.questionForm = this.questionFormService.createForm(this.question);
  }

  create() {
    this.buttonClicked = true;
    this.questionService
      .create(this.questionForm.value)
      .then(response => {
        this.toastr.showMessage('Questions Added Successfully');
        this.router.navigate([AppRoutes.questions]);
      })
      .catch(errorResponse => {
        console.log(errorResponse);
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }
}
