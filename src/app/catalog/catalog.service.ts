import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Catalog} from '../model/catalog';
import {map} from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class CatalogService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('alex:password')
    })
  };

  constructor(private http: HttpClient) {
  }

  getCatalogItems() {
    return this.http.get<any []>(environment.url + '/catalog', this.httpOptions).pipe(map(res => res['Catalog']));
  }
  getCatalogItemsByParams(APPLICATION_NAME) {
  return this.http.get<any []>(environment.url + '/service?APPLICATION_NAME=' + APPLICATION_NAME,
    this.httpOptions);
  }

  addCatalogItem(catalogItem: Catalog) {
    return this.http.post(environment.url + '/catalog', catalogItem, this.httpOptions);
  }

  deleteCatalogItem(catalogId) {
    return this.http.delete(environment.url + '/catalog?catalogid=' + catalogId, this.httpOptions);
  }

  updateCatalogItem(catalogItem: Catalog) {
    return this.http.put(environment.url + '/catalog', catalogItem, this.httpOptions);
  }

  getAppsNames(param) {
    return this.http.get(environment.url + '/application?name=' + param, this.httpOptions);
  }
}
