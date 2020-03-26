import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

// Models
import { Sponsor } from '../models/sponsor.model';

@Injectable({
  providedIn: 'root'
})
export class SponsorFormService {

  constructor(
    private fb: FormBuilder,
  ) { }

  createForm(sponsor: Sponsor) {
    return this.fb.group({
        id: [sponsor.id],
        name: [sponsor.name, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        file: [''],
      });
  }
}