import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { DashboardService } from './services/dashboard.service';
// Directives
import { ScrollToBottomDirective } from '../shared/directives/scroll-to-bottom.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputBox', {static: false}) inputBox: ElementRef;
  @ViewChild(ScrollToBottomDirective, {static: false}) scroll: ScrollToBottomDirective;

  messages: Array<any>;
  message = '';

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

  ngAfterViewChecked() {
    this.inputBox.nativeElement.focus();
  }

  sendMessage() {
    this.dashboardService.sendChat(this.message);
    this.message = '';
    this.inputBox.nativeElement.focus();
  }

}
