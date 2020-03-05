import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import * as moment from 'moment';

// Models
import { Sets } from '../../models/sets.model';

@Injectable({
  providedIn: 'root'
})
export class SetsFormService {
  currentDate = moment(new Date(), 'YYYY-MM-DD').subtract('days', 1);

  constructor(
    private fb: FormBuilder,
  ) { }

  createForm(sets: Sets) {
    return this.fb.group({
        id: [sets.id],
        name: [sets.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        scheduleDate: [sets.scheduleDate, [Validators.required, CustomValidators.minDate(this.currentDate)]],
      });
  }
}
