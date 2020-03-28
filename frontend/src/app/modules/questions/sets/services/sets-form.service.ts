import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import * as moment from 'moment';

// Models
import { Sets } from '../../models/sets.model';
import { Sponsor } from 'src/app/modules/sponsor/models/sponsor.model';

@Injectable({
  providedIn: 'root'
})
export class SetsFormService {
  currentDate = moment(new Date(), 'YYYY-MM-DD').subtract('days', 1);

  constructor(
    private fb: FormBuilder,
  ) { }

  createForm(sets: Sets, sponsors: Sponsor[]) {
    return this.fb.group({
        id: [sets.id],
        name: [sets.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        prize: [sets.prize, [Validators.required, CustomValidators.gte(1), CustomValidators.lte(999999)]],
        // scheduleDate: [sets.scheduleDate, [Validators.required, CustomValidators.minDate(this.currentDate)]],
        scheduleDate: [moment(sets.scheduleDate).format("YYYY-MM-DDTHH:mm"), [Validators.required]],
        sponsors: [sponsors, [Validators.required]]
      });
  }
}
