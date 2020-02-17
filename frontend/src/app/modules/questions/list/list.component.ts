import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';

// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { QuestionService } from '../services/question.service';
// Models
import { Sets } from '../models/sets.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  set: Sets = new Sets();
  questions: Question[];
  currentDate = new Date();
  loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((res) => {
      this.loading = false;
      this.questions = res.data.data.questions;
      this.set = res.data.data.set;
    });
  }

  fetchLists() {
    this.loading = true;
    this.questionService.fetchQuestionsList(this.set._id)
      .then(successResponse => {
        this.loading = false;
        this.questions = successResponse.data.questions;
    })
    .catch(errorResponse => {
      this.toastr.showMessage(errorResponse.error.message, 'error');
    });
  }

  removeQuestion(question: Question) {
    if (confirm('Are you sure to delete ' + question.name + '\'s Question')) {
      this.questionService
        .removeQuestion(question._id)
        .then(successResponse => {
          this.toastr.showMessage('Question deleted Successfully');
          this.fetchLists();
        })
        .catch(errorResponse => {
          this.toastr.showMessage(errorResponse, 'error');
        });
    }
  }

}
