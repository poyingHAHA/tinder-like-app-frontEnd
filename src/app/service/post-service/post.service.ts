import { environment } from 'src/environments/environment';
import { ProductPost } from './../../model/interface/ProductPost';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getProductPosts(limit: number, skip: number, shopid: string): Observable<ProductPost[]>
  {
    let uri: string = `${environment.domain}/${environment.baseRoute.items}/?limit=${limit}&skip=${skip}&shopid=${shopid}`
    return this.http.get<ProductPost[]>(uri);
  }
}
