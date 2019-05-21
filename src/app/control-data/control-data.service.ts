import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ControlData} from '../model/control-data';


@Injectable()
export class ControlDataService {

  constructor(private http: HttpClient) {}

  getControlDataItems() {
    return this.http.get('/assets/control-data.json')
      .toPromise()
      .then(res => <ControlData[]> res)
      .then(data => data);
  }
}
