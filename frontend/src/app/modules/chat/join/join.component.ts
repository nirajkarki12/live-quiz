import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  nickname = '';

  constructor(
    private router: Router,
    private socket: Socket,
  ) {}

  ngOnInit() {
  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.router.navigateByUrl(`chat/message/${this.nickname}`);
  }

}
