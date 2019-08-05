import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ErrorCode} from '../model/error-code';
import {map} from 'rxjs/operators';

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
    return this.http.get<any []>("http://192.168.1.70:8080/errorcode", this.httpOptions).pipe(map(res => res['ErrorCode']));
  }


  addErrorCodeItem(errorCodeItem: ErrorCode) {
    return this.http.post('http://192.168.1.70:8080/errorcode', errorCodeItem , this.httpOptions)
  }

  deleteErrorCodeItem(errorcodeid) {
    return this.http.delete('http://192.168.1.70:8080/errorcode?errorcodeid=' + errorcodeid, this.httpOptions);
  }

  updateErrorCodeItem(errorCodeItem: ErrorCode) {
    return this.http.put('http://192.168.1.70:8080/errorcode', errorCodeItem, this.httpOptions);
  }
}
