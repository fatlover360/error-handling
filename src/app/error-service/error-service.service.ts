import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {ErrorService} from '../model/error-service';
import { environment } from '../../environments/environment';


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
    return this.http.get<any []>(environment.url + '/errorservice', this.httpOptions).pipe(map(res => res['ErrorService']));
  }


  addErrorServiceItem(errorServiceItem: ErrorService) {
    return this.http.post(environment.url + '/errorservice', errorServiceItem , this.httpOptions);
  }

  deleteErrorServiceItem(errorserviceid, catalogid, appname, nativecode, iserror) {
    return this.http.delete(environment.url + '/errorservice?error_code_id=' + errorserviceid + '&eai_catalog_id=' + catalogid + '&application_name=' + appname + '&system_native_code=' +  nativecode + '&iserror=' + iserror, this.httpOptions);
  }

  deleteErrorService(errorserviceid, catalogid) {
    return this.http.delete(environment.url + '/errorservice?error_code_id=' + errorserviceid + '&eai_catalog_id=' + catalogid, this.httpOptions);
  }

  updateErrorServiceItem(errorServiceItem: ErrorService, errorServiceDB: ErrorService) {
    return this.http.put(environment.url + '/errorservice?aplication_name=' + errorServiceDB.APPLICATION_NAME + '&native_code=' + errorServiceDB.SYSTEM_NATIVE_CODE + '&is_error=' + errorServiceDB.IS_ERROR + '&eai_catalog_id=' + errorServiceDB.Catalog.EAI_CATALOG_ID + '&error_code_id=' + errorServiceDB.ErrorCode.EAI_ERROR_CODE_ID, errorServiceItem, this.httpOptions);
  }
}
