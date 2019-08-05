import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';


@Injectable()
export class ControlDataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('alex:password'),
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {
  }

  getControlDataItems() {
    return this.http.get<any []>("http://192.168.1.70:8080/controldata", this.httpOptions).pipe(map(res => res['ControlData']));
  }




}
