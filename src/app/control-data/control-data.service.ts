import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {ControlData} from '../model/control-data';


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

  getControlDataItems(transactionid, error_code, status, application_name, fromDate, toDate) {
    return this.http.get<any []>('http://192.168.1.70:8080/controldata?transaction_id=' + transactionid + '&error_code=' + error_code + '&status=' + status + '&application_name=' + application_name + '&from_date=' + fromDate + '&to_date=' + toDate , this.httpOptions).pipe(map(res => res['ControlData']));
  }

  republish(controlDataArray: any) {
    return this.http.put('http://192.168.1.70:8080/republish', controlDataArray, this.httpOptions);
  }
}
