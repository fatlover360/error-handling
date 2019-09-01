import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ErrorCode} from '../model/error-code';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ErrorCodeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('alex:password')
    })
  };

  constructor(private http: HttpClient) {}

  getErrorCodeItems() {
    return this.http.get<any []>(environment.url + '/errorcode', this.httpOptions).pipe(map(res => res['ErrorCode']));
  }


  addErrorCodeItem(errorCodeItem: ErrorCode) {
    return this.http.post(environment.url + '/errorcode', errorCodeItem , this.httpOptions)
  }

  deleteErrorCodeItem(errorcodeid) {
    return this.http.delete(environment.url + '/errorcode?errorcodeid=' + errorcodeid, this.httpOptions);
  }

  updateErrorCodeItem(errorCodeItem: ErrorCode) {
    return this.http.put(environment.url + '/errorcode', errorCodeItem, this.httpOptions);
  }
}
