import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { SetsFormService } from '../services/sets-form.service';
import { SetsService } from '../services/sets.service';

// Models
import { Sets } from '../../models/sets.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  setsForm: FormGroup;
  sets: Sets = new Sets();
  buttonClicked: Boolean = false;
  currentDate = new Date();

  constructor(
    private router: Router,
    private setsService: SetsService,
    private setsFormService: SetsFormService,
    private toastr: ValidatorMessageService,
  ) { }

  ngOnInit() {
    this.setsForm = this.setsFormService.createForm(this.sets);
  }

  create() {
    this.buttonClicked = true;
    this.setsService
      .create(this.setsForm.value)
      .then(response => {
        this.toastr.showMessage('Questions Set Added Successfully');
        this.router.navigate([AppRoutes.questions + '/' + AppRoutes.sets]);
      })
      .catch(errorResponse => {
        console.log(errorResponse);
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

}
