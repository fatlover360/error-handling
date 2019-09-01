import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Configuration} from '../model/configuration';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';


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
    return this.http.get<any []>(environment.url + '/configuration', this.httpOptions).pipe(map(res => res['Configuration']));
  }


  addConfigurationItem(configuration: Configuration) {
    return this.http.post(environment.url + '/configuration', configuration , this.httpOptions)
  }

  deleteConfigurationItem(errorcodeid, catalogid) {
    return this.http.delete(environment.url + '/configuration?catalogid=' + catalogid + '&errocodeid=' + errorcodeid, this.httpOptions);
  }

  updateConfigurationItem(configuration: Configuration, configDB: Configuration) {
    return this.http.put(environment.url + '/configuration', configuration, this.httpOptions);
  }
}
