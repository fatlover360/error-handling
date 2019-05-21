import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Configuration} from '../model/configuration';



@Injectable()
export class ConfigurationService {

  constructor(private http: HttpClient) {}

  getConfigurationItems() {
    return this.http.get('/assets/configuration.json')
      .toPromise()
      .then(res => <Configuration[]> res)
      .then(data => data);
  }
}
