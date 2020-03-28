import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
import { Subscription } from 'rxjs';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { SetsFormService } from '../services/sets-form.service';
import { SetsService } from '../services/sets.service';
// Models
import { Sets } from '../../models/sets.model';
import { Sponsor } from 'src/app/modules/sponsor/models/sponsor.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  setForm: FormGroup;
  setEdit: Sets = new Sets();
  sponsors: Sponsor[];
  buttonClicked = false;
  sub: Subscription;
  currentDate = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private setFormService: SetsFormService,
    private setService: SetsService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((data) => {
      this.sponsors = data.sponsors.body.data;
      this.setEdit = data.sets.data;
      this.setForm = this.setFormService.createForm(this.setEdit, this.sponsors);
    });
  }

  update() {
    this.buttonClicked = true;
    this.setService
      .update(this.setForm.value)
      .then(response => {
        this.toastr.showMessage('Sets updated Successfully');
        this.router.navigate([AppRoutes.sets]);
      })
      .catch(errorResponse => {
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

}
