import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { QuestionFormService } from '../services/question-form.service';
import { QuestionService } from '../services/question.service';
// Models
import { Sets } from '../models/sets.model';
import { Question } from '../models/question.model';
import { Sponsor } from '../../sponsor/models/sponsor.model';
import { SponsorService } from '../../sponsor/services/sponsor.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  questionForm: FormGroup;
  question: Question = new Question();
  sets: Sets = new Sets();
  buttonClicked: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private questionFormService: QuestionFormService,
    private toastr: ValidatorMessageService,
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((data) => {
      this.sets = data.sets.data;
      this.questionForm = this.questionFormService.createForm(this.question, this.sets);
    });

  }

  create() {
    this.buttonClicked = true;
    this.questionService
      .create(this.questionForm.value)
      .then(response => {
        this.toastr.showMessage('Questions Added Successfully');
        this.router.navigate([AppRoutes.questions + '/list/' + this.sets.id]);
      })
      .catch(errorResponse => {
        console.log(errorResponse);
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

}
