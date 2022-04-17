import { ProductPost } from './../../model/interface/ProductPost';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURI, routeType } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  route: routeType = "items";

  constructor(
    private http: HttpClient
  ) { }

  getProductPosts(limit: number, skip: number, shopid: string): Observable<ProductPost[]>
  {
    let uri: string = `${baseURI}/${this.route}/?limit=${limit}&skip=${skip}&shopid=${shopid}`
    return this.http.get<ProductPost[]>(uri);
  }
}
