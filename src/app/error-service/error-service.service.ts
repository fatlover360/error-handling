import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ErrorService} from '../model/error-service';


@Injectable()
export class ErrorServiceService {

  constructor(private http: HttpClient) {}

  getErrorServiceItems() {
    return this.http.get('/assets/error-service.json')
      .toPromise()
      .then(res => <ErrorService[]> res)
      .then(data => data);
  }
}
