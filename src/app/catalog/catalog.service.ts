import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Catalog} from '../model/catalog';



@Injectable()
export class CatalogService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('alex:password')
    })
  };

  constructor(private http: HttpClient) {}

  getCatalogItems() {
    return this.http.get<Catalog []>("/assets/catalog.json");
  }

  getTest() {
    return this.http.get("http://polarising-p126:8080/test");
  }

  addCatalogItem(catalogItem: Catalog) {
    return this.http.post('/assets/catalog.json', catalogItem)
      .toPromise()
      .then(data => data);
  }

  deleteCatalogItem(catalogId) {
    return this.http.delete('/assets/catalog.json')
      .toPromise()
      .then(data => data);
  }

  updateCatalogItem(catalogItem: Catalog) {
    return this.http.put('/assets/catalog.json', catalogItem)
      .toPromise()
      .then(data => data);
  }
}
