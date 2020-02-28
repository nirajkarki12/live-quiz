import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Question } from '../../questions/models/question.model';
import { Sets } from '../../questions/models/sets.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  preMessages: any;
  preMessageRxSubject: Subject<any> = new BehaviorSubject<any>(this.preMessages);
  totalUsers: number;
  totalUsersRxSubject: Subject<any> = new BehaviorSubject<any>(this.totalUsers);

  constructor(private socket: Socket) { }

  syncPreMessage() {
    this.preMessageRxSubject.next(
      this.preMessages
    );
  }
  getPreMessageRxSubject() {
    return this.preMessageRxSubject.asObservable();
  }
  getAndSyncPreChat() {
    return this.socket.fromEvent('pre-messages').subscribe((successResponse) => {
      this.preMessages = successResponse;
      this.syncPreMessage();
    });
  }

  syncTotalUsers() {
    this.totalUsersRxSubject.next(
      this.totalUsers
    );
  }
  getTotalUsersRxSubject() {
    return this.totalUsersRxSubject.asObservable();
  }
  getAndSyncTotalUsers() {
    return this.socket.fromEvent('totalUsers').subscribe((successResponse: number) => {
      this.totalUsers = successResponse;
      this.syncTotalUsers();
    });
  }

  startQuiz(set: Sets) {
    this.socket.emit('quizEvent', {'set': set});
  }

  emitQuestionsToCLient(question: Question) {
    this.socket.emit('quizEvent', {'question': question});
  }

  endQuiz(set: Sets) {
    this.socket.emit('quiz-ended', set);
  }

  finalResult(): Observable<any> {
    return this.socket.fromEvent('quiz-final-result');
  }

  resultRequest(question: Question) {
    this.socket.emit('result-request', {'question': question});
  }

  viewOnly(): Observable<any[]> {
    return this.socket.fromEvent('view-only');
  }

  sendChat(message) {
    this.socket.emit('add-message', message);
  }

  questionResult(): Observable<Question> {
    return this.socket.fromEvent('question-result');
  }

  receiveChat(): Observable<any[]> {
    return this.socket.fromEvent('message');
  }

  usersChanged() {
    return this.socket.fromEvent('users-changed');
  }
}
