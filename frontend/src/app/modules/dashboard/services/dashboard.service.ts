import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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

  sendChat(message) {
    this.socket.emit('add-message', message);
  }

  receiveChat(): Observable<any[]> {
    return this.socket.fromEvent('message');
  }

  usersChanged() {
    return this.socket.fromEvent('users-changed');
  }
}
