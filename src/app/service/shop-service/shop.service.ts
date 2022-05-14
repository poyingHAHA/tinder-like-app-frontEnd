import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from 'src/app/model/interface/Shop';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseURI: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseURI = `${environment.domain}/${environment.baseRoute.shop}`;
  }

  getShop(id: string)
  {
    let uri = this.baseURI+`/${id}`;
    return this.http.get<Shop>(uri);
  }
}
