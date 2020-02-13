import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

// Models
import { Sets } from '../models/sets.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionFormService {

  constructor(
    private fb: FormBuilder,
  ) { }

  createForm(question: Question) {
    return this.fb.group({
        _id: [question._id],
        name: [question.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        option1: [question.option1, [Validators.required]],
      });
  }
}
