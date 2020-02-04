import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages = [];
  nickname = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nickname = params.nickname;
    });

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

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

}
