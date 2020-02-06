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

  constructor(
    private socket: Socket,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.socket.connect();
    this.socket.on('message', message => this.messages.push(message));

    this.socket.on('users-changed', (data) => {
      if (data['event'] === 'left') {
        this.toastr.showMessage(data.text, 'error');
      } else {
        this.toastr.showMessage(data.text, 'success');
      }
    });
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sendMessage() {
    this.socket.emit('add-message', { message: this.message });
    this.message = '';
  }

}
