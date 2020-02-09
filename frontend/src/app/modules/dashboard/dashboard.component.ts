import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { DashboardService } from './services/dashboard.service';
// Directives
import { ScrollToBottomDirective } from '../shared/directives/scroll-to-bottom.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(ScrollToBottomDirective, {static: false}) scroll: ScrollToBottomDirective;

  messages: Array<any>;
  totalUsers: number;
  message = '';

  preMessageSubscription: Subscription;
  messageSubscription: Subscription;
  usersSubscription: Subscription;
  usersChangedSubscription: Subscription;

  constructor(
    private toastr: ValidatorMessageService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.preMessageSubscription = this.dashboardService.preChat().subscribe((preMessage: any) => {
      this.messages = preMessage;
      this.messageSubscription = this.dashboardService.receiveChat().subscribe((message: any) => {
        this.messages.push(message);
      });
    });

    this.usersSubscription = this.dashboardService.getTotalUsers().subscribe((total: number) => {
      this.totalUsers = total;
    });
    this.usersChangedSubscription = this.dashboardService.usersChanged().subscribe((data: any) => {
      if (data['event'] === 'left') {
        this.toastr.showMessage(data.text, 'error');
      } else {
        this.toastr.showMessage(data.text, 'success');
      }
    });
  }

  sendMessage() {
    this.dashboardService.sendChat(this.message);
    this.message = '';
  }

  ngOnDestroy() {
    if (this.preMessageSubscription) {
      this.preMessageSubscription.unsubscribe();
    }

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }

    if (this.usersChangedSubscription) {
      this.usersChangedSubscription.unsubscribe();
    }
  }

}
