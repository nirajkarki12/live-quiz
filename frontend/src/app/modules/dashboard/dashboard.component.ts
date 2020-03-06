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
  set: Sets = new Sets();
  questions: Question[];
  messages: Array<any>;
  totalUsers: number;
  message = '';
  quizStarted = false;
  loading = false;
  questionCompleted = true;

  preMessageSubscription: Subscription;
  messageSubscription: Subscription;
  totalUsersSubscription: Subscription;
  usersChangedSubscription: Subscription;
  questionResultSubscription: Subscription;
  viewOnlySubscription: Subscription;
  finalResultSubscription: Subscription;

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

    this.viewOnlySubscription = this.dashboardService.viewOnly().subscribe((data: any) => {
      console.log(data);
    });

    this.messageSubscription = this.dashboardService.receiveChat().subscribe((message: any) => {
      this.messages.push(message);
    });

    this.questionResultSubscription = this.dashboardService.questionResult().subscribe((data: any) => {
      let question = data.question;
      let currentIndex = this.questions.findIndex(x => x.id === question.id);
      let res = question.results;
      let results = {
        input: '', 
        option1: '', 
        option2: '', 
        option3: '', 
        option4: ''
      }
      res.forEach(x => {
        if (x.input === this.questions[currentIndex].option1) {
          results.input = x.input;
          results.option1 = x.total;
        } else if (x.input === this.questions[currentIndex].option2) {
          results.input = x.input;
          results.option2 = x.total;
        } else if (x.input === this.questions[currentIndex].option3) {
          results.input = x.input;
          results.option3 = x.total;
        } else if (x.input === this.questions[currentIndex].option4) {
          results.input = x.input;
          results.option4 = x.total;
        } 
      });

      this.questions[currentIndex].results = results;
    });

    this.finalResultSubscription = this.dashboardService.finalResult().subscribe((data: any) => {
      console.log('final result', data);
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
    this.loading = true;
    this.setsService.activeQuestionSets()
      .then(successResponse => {
        this.loading = false;
        this.sets = successResponse.body;
    })
    .catch(errorResponse => {
      this.loading = false;
      this.toastr.showMessage(errorResponse.error.message, 'error');
    });
  }

  sendMessage() {
    this.dashboardService.sendChat(this.message);
    this.message = '';
  }

  startQuiz(set: Sets) {
    this.loading = true;
    this.quizStarted = true;
    this.questionService.fetchQuestionsClient(set.id)
      .then(successResponse => {
        this.loading = false;
        this.set = successResponse.data;
        this.questions = this.set.questions;
        delete this.set.questions;
        this.dashboardService.startQuiz(this.set);
    })
    .catch(errorResponse => {
      this.loading = false;
      this.quizStarted = false;
      this.toastr.showMessage(errorResponse.error.message, 'error');
    });
  }

  endQuiz() {
    this.dashboardService.endQuiz(this.set);
    this.quizStarted = false;
    this.questions = null;
    this.questionCompleted = true;
    this.fetchLists();
  }

  sendQuestionsToClient(question: Question) {
    this.loading = true;
    this.questionCompleted = false;

    let currentIndex = this.questions.findIndex(x => x.id === question.id);

    this.questions[currentIndex].waitingAnswer = true;
    this.questions[currentIndex].questionSent = true;

    question.questionSent = true;
    question.waitingAnswer = true;
    this.dashboardService.emitQuestionsToCLient(question);

    setTimeout(() => {
      // this.dashboardService.resultRequest(question);
      this.questions[currentIndex].disabled = true;
      this.loading = false;
    }, 5000);
  }

  requestQuestionResult(question: Question) {
      let currentIndex = this.questions.findIndex(x => x.id === question.id);

      this.dashboardService.resultRequest(question);

      this.questions[currentIndex].waitingAnswer = false;
      this.questions[currentIndex].disabled = true;
      this.loading = false;
      this.questionCompleted = true;
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

    if (this.questionResultSubscription) {
      this.questionResultSubscription.unsubscribe();
    }

    if (this.viewOnlySubscription) {
      this.viewOnlySubscription.unsubscribe();
    }

    if (this.finalResultSubscription) {
      this.finalResultSubscription.unsubscribe();
    }
  }

}