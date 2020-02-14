import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/constants/api-constants';
// Models
import { Sets } from '../../models/sets.model';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  constructor(private http: HttpClient) { }

  create(setsModel: Sets): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.QUESTIONSETS +
      ApiConstants.CREATE
      , setsModel,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  list(): Promise<any> {
    return this.http.get(
      ApiConstants.API_ENDPOINT +
      ApiConstants.QUESTIONSETS ,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  removeSet(setId: string): Promise<any> {
    return this.http
      .delete(
        ApiConstants.API_ENDPOINT +
        ApiConstants.QUESTIONSETS + '/' +
        setId
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  fetchSetsDetail(id): Promise<any> {
    return this.http
      .get(
        ApiConstants.API_ENDPOINT +
        ApiConstants.QUESTIONSETS + '/' +
        id
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  update(setModel: Sets): Promise<any> {
    return this.http.patch(
      ApiConstants.API_ENDPOINT +
      ApiConstants.QUESTIONSETS + '/' + setModel._id
      , setModel,
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
