import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/constants/api-constants';
// Models
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  create(questionModel: Question): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.QUESTION +
      ApiConstants.CREATE
      , questionModel,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  getQuestion(id): Promise<any> {
    return this.http
      .get(
        ApiConstants.API_ENDPOINT +
        ApiConstants.QUESTION + '/' +
        id
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  fetchQuestionsList(id): Promise<any> {
    return this.http
      .get(
        ApiConstants.API_ENDPOINT +
        ApiConstants.QUESTION +
        ApiConstants.SET + '/' +
        id
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  fetchQuestionsClient(id): Promise<any> {
    return this.http
      .get(
        ApiConstants.API_ENDPOINT +
        ApiConstants.QUESTION +
        ApiConstants.CLIENT + '/' +
        id
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  removeQuestion(questionId: string): Promise<any> {
    return this.http
      .delete(
        ApiConstants.API_ENDPOINT +
        ApiConstants.QUESTION + '/' +
        questionId
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  update(question: Question): Promise<any> {
    return this.http.patch(
      ApiConstants.API_ENDPOINT +
      ApiConstants.QUESTION + '/' + question._id
      , question,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  handleSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

  handleError(response: any): Promise<any> {
    return Promise.reject(response);
  }

}
