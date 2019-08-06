import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

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
    return this.http.get<any []>("http://192.168.1.70:8080/controlsequence", this.httpOptions).pipe(map(res => res['ControlSequence']));
  }

  deleteControlSequence(controlsequenceid) {
    return this.http.delete('http://192.168.1.70:8080/controlsequence?controlsequenceid=' + controlsequenceid, this.httpOptions);
  }
}
