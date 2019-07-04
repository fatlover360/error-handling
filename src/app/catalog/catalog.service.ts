import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Catalog} from '../model/catalog';
import {map} from "rxjs/internal/operators";


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
    return this.http.get<any []>("http://polarising-p126:8080/catalog", this.httpOptions).pipe(map(res => res['Catalog']));
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
