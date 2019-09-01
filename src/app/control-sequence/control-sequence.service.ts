import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlSequenceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('alex:password')
    })
  };

  constructor(private http: HttpClient) {}

  getControlSequences() {
    return this.http.get<any []>(environment.url + '/controlsequence', this.httpOptions).pipe(map(res => res['ControlSequence']));
  }

  deleteControlSequence(controlsequenceid) {
    return this.http.delete(environment.url + '/controlsequence?controlsequenceid=' + controlsequenceid, this.httpOptions);
  }
}
