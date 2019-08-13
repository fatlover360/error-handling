import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Catalog} from '../model/catalog';
import {map} from 'rxjs/internal/operators';


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
    return this.http.get<any []>('http://192.168.1.70:8080/catalog', this.httpOptions).pipe(map(res => res['Catalog']));
  }
  getCatalogItemsByParams(APPLICATION_NAME) {
  return this.http.get<any []>('http://192.168.1.70:8080/service?APPLICATION_NAME=' + APPLICATION_NAME,
    this.httpOptions);
  }

  addCatalogItem(catalogItem: Catalog) {
    return this.http.post('http://192.168.1.70:8080/catalog', catalogItem, this.httpOptions);
  }

  deleteCatalogItem(catalogId) {
    return this.http.delete('http://192.168.1.70:8080/catalog?catalogid=' + catalogId, this.httpOptions);
  }

  updateCatalogItem(catalogItem: Catalog) {
    return this.http.put('http://192.168.1.70:8080/catalog', catalogItem, this.httpOptions);
  }

  getAppsNames(param) {
    return this.http.get('http://192.168.1.70:8080/application?name=' + param, this.httpOptions);
  }
}
