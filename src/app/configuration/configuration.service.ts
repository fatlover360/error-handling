import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Configuration} from '../model/configuration';
import {map} from 'rxjs/operators';

@Injectable()
export class ConfigurationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('alex:password')
    })
  };

  constructor(private http: HttpClient) {}

  getConfigurationItems() {
    return this.http.get<any []>('http://192.168.1.70:8080/configuration', this.httpOptions).pipe(map(res => res['Configuration']));
  }


  addConfigurationItem(configuration: Configuration) {
    return this.http.post('http://192.168.1.70:8080/configuration', configuration , this.httpOptions)
  }

  deleteConfigurationItem(configurationid) {
    return this.http.delete('http://192.168.1.70:8080/configuration?errorcodeid=' + configurationid, this.httpOptions);
  }

  updateConfigurationItem(configuration: Configuration, configDB: Configuration) {
    return this.http.put('http://192.168.1.70:8080/configuration', configuration, this.httpOptions);
  }
}
