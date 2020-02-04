import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  messages = [];
  message = '';
  radioModel: string = 'Month';
  nickname = 'Admin';

  constructor(
    private socket: Socket,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);

    this.socket.on('message', message => this.messages.push(message));

    this.socket.on('users-changed', (data) => {
      const user = data['user'];
      if (data['event'] === 'left') {
        this.toastr.showMessage('User left: ' + user, 'error');
      } else {
        this.toastr.showMessage('User joined: ' + user, 'success');
      }
    });
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message, from: this.nickname });
    this.message = '';
  }

}
