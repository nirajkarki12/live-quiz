import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private socket: Socket) { }

  sendChat(message) {
    this.socket.emit('add-message', message);
  }

  receiveChat(): Observable<any[]> {
    return this.socket.fromEvent('message');
  }

  preChat(): Observable<any[]> {
    return this.socket.fromEvent('pre-messages');
  }

  usersChanged() {
    return this.socket.fromEvent('users-changed');
  }

  getTotalUsers() {
    return this.socket.fromEvent('totalUsers');
  }
}
