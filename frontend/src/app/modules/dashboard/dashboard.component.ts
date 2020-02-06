import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  messages: Array<any>;
  message = '';
  radioModel: string = 'Month';

  constructor(
    private toastr: ValidatorMessageService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.preChat().subscribe((message: any) => {
      this.messages = message;
    });

    this.dashboardService.receiveChat().subscribe((message: any) => {
      this.messages.push(message);
    });

    this.dashboardService.usersChanged().subscribe((data: any) => {
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
    this.dashboardService.sendChat(this.message);
    this.message = '';
  }

}
