import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ErrorCode} from '../model/error-code';


@Injectable()
export class ErrorCodeService {

  constructor(private http: HttpClient) {}

  getErrorCodeItems() {
    return this.http.get('/assets/error-code.json')
      .toPromise()
      .then(res => <ErrorCode[]> res)
      .then(data => data);
  }
}
