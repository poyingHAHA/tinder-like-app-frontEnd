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

  getSpecificProductPost(id: string): Observable<ProductPost>
  {
    return this.http.get<ProductPost>(`${this.baseURI}/${id}`);
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

  likePost(itemid: string, buyerid: string): Observable<ProductPost>
  {
    let uri: string = `${this.baseURI}/like`;
    return this.http.patch<ProductPost>(uri, {
      itemid: itemid,
      buyerid: buyerid
    });
  }

  unlikePost(itemid: string, buyerid: string): Observable<ProductPost>
  {
    let uri: string = `${this.baseURI}/unlike`;
    return this.http.patch<ProductPost>(uri, {
      itemid: itemid,
      buyerid: buyerid
    });
  }

  searchPost(keyword: string): Observable<ProductPost[]>
  {
    let uri: string = `${this.baseURI}/search`;
    return this.http.post<ProductPost[]>(uri, {
      keyword: keyword
    });
  }

  getSearchPost(keyword: string): Observable<ProductPost[]>
  {
    let uri: string = `${this.baseURI}/getSearch`;
    return this.http.post<ProductPost[]>(uri, {
      keyword: keyword
    });
  }
}
