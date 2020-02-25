import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

// Models
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionFormService {

  constructor(
    private fb: FormBuilder,
  ) { }

  createForm(question: Question, setId: String) {
    let option1 = new FormControl(question.option1, Validators.required);
    let option2 = new FormControl(question.option2, Validators.required);
    let option3 = new FormControl(question.option3, Validators.required);
    let option4 = new FormControl(question.option4, Validators.required);
    let answer = new FormControl(question.answer, [Validators.required]);

    return this.fb.group({
        _id: [question._id],
        name: [question.name, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
        level: [question.level, [Validators.required]],
        questionSetId: [setId, [Validators.required]],
      });
  }
}
