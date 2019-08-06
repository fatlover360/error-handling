import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {ErrorService} from '../model/error-service';


@Injectable()
export class ErrorServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('alex:password')
    })
  };

  constructor(private http: HttpClient) {}

  getErrorServiceItems() {
    return this.http.get<any []>("http://192.168.1.70:8080/errorservice", this.httpOptions).pipe(map(res => res['ErrorService']));
  }


  addErrorServiceItem(errorServiceItem: ErrorService) {
    return this.http.post('http://192.168.1.70:8080/errorservice', errorServiceItem , this.httpOptions)
  }

  deleteErrorServiceItem(errorserviceid) {
    return this.http.delete('http://192.168.1.70:8080/errorservice?errorserviceid=' + errorserviceid, this.httpOptions);
  }

  updateErrorServiceItem(errorServiceItem: ErrorService) {
    return this.http.put('http://192.168.1.70:8080/errorservice', errorServiceItem, this.httpOptions);
  }
}
