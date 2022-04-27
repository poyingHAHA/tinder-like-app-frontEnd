import { environment } from 'src/environments/environment';
import { ProductPost } from './../../model/interface/ProductPost';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURI: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseURI = `${environment.domain}/${environment.baseRoute.items}`;
  }

  getProductPosts(limit: number, skip: number, shopid: string): Observable<ProductPost[]>
  {
    let uri: string = `${this.baseURI}/?limit=${limit}&skip=${skip}&shopid=${shopid}`
    return this.http.get<ProductPost[]>(uri);
  }

  getProductPostsRandomly(num: number): Observable<ProductPost[]>
  {
    let uri: string = `${this.baseURI}/random/${num}`;
    return this.http.get<ProductPost[]>(uri);
  }
}
