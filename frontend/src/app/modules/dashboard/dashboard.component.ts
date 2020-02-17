import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { DashboardService } from './services/dashboard.service';
import { SetsService } from '../questions/sets/services/sets.service';
import { QuestionService } from '../questions/services/question.service';
// Directives
import { ScrollToBottomDirective } from '../shared/directives/scroll-to-bottom.directive';
// Models
import { Sets } from '../questions/models/sets.model';
import { Question } from '../questions/models/question.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(ScrollToBottomDirective, {static: false}) scroll: ScrollToBottomDirective;
  sets: Sets;
  set: Sets;
  questions: Question[];
  messages: Array<any>;
  totalUsers: number;
  message = '';
  quizStarted = false;

  preMessageSubscription: Subscription;
  messageSubscription: Subscription;
  totalUsersSubscription: Subscription;
  usersChangedSubscription: Subscription;

  constructor(
    private toastr: ValidatorMessageService,
    private dashboardService: DashboardService,
    private setsService: SetsService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.fetchLists();
    this.dashboardService.getAndSyncPreChat();
    this.preMessageSubscription = this.dashboardService.getPreMessageRxSubject()
      .subscribe(preMessage => {
        this.messages = preMessage;
    });

    this.dashboardService.getAndSyncTotalUsers();
    this.totalUsersSubscription = this.dashboardService.getTotalUsersRxSubject()
        .subscribe(total => {
          this.totalUsers = total;
    });

    this.messageSubscription = this.dashboardService.receiveChat().subscribe((message: any) => {
      this.messages.push(message);
    });

    this.usersChangedSubscription = this.dashboardService.usersChanged().subscribe((data: any) => {
      if (data['event'] === 'left') {
        this.toastr.showMessage(data.text, 'error');
      } else {
        this.toastr.showMessage(data.text, 'success');
      }
    });
  }

  fetchLists() {
    this.setsService.activeQuestionSets()
      .then(successResponse => {
        this.sets = successResponse.body;
    })
    .catch(errorResponse => {
      this.toastr.showMessage(errorResponse.error.message, 'error');
    });
  }

  sendMessage() {
    this.dashboardService.sendChat(this.message);
    this.message = '';
  }

  startQuiz(set: Sets) {
    this.quizStarted = true;
    this.questionService.fetchQuestionsList(set._id)
      .then(successResponse => {
        this.questions = successResponse.data.questions;
        this.set = successResponse.data.set;
        console.log(this.questions);
    })
    .catch(errorResponse => {
      this.quizStarted = false;
      this.toastr.showMessage(errorResponse.error.message, 'error');
    });
  }

  ngOnDestroy() {
    if (this.preMessageSubscription) {
      this.preMessageSubscription.unsubscribe();
    }

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if (this.totalUsersSubscription) {
      this.totalUsersSubscription.unsubscribe();
    }

    if (this.usersChangedSubscription) {
      this.usersChangedSubscription.unsubscribe();
    }
  }

}
