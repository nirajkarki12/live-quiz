import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sponsor } from '../models/sponsor.model';
import { ApiConstants } from 'src/app/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private http: HttpClient) { }

  list(): Promise<any> {
    return this.http.get(
      ApiConstants.API_ENDPOINT +
      ApiConstants.SPONSOR, {observe: 'response'}
    )
    .toPromise()
    .then(this.handleSuccess)
    .catch(this.handleError);
  }

  create(sponsor: FormData): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.SPONSOR +
      ApiConstants.CREATE
      , sponsor, { observe: 'response'})
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  delete(sponsor: Sponsor): Promise<any> {
    return this.http.delete(
      ApiConstants.API_ENDPOINT +
      ApiConstants.SPONSOR + '/' + sponsor.id,
      { observe: 'response'}
    )
    .toPromise()
    .then(this.handleSuccess)
    .catch(this.handleError)
  }

  handleSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

  handleError(response: any): Promise<any> {
    return Promise.reject(response);
  }
}
