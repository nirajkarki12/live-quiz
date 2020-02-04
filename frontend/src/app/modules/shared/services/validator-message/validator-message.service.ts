import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ValidatorMessageService {

  constructor(
    private toastr: ToastrService,
  ) { }

  showMessage(jsonMessages: any, type = 'success') {
    if (type === 'error') {
      if (jsonMessages.hasOwnProperty('error')) {
        this.toastr.error(jsonMessages.error.message);
      } else {
        if (jsonMessages === 'Token has expired and can no longer be refreshed') {
          jsonMessages = 'Session Timeout, Please login to continue';
        }
        this.toastr.error(jsonMessages);
      }
    } else {
      this.toastr.success(jsonMessages);
    }
  }

}
