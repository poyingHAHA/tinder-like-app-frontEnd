import { Observable, of, switchMap } from 'rxjs';
import { ProductComment } from './../../model/DTO/ProductComment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseURI: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseURI = `${environment.domain}/${environment.baseRoute.comment}`;
  }

  getProductComment(id: string): Observable<ProductComment[]>
  {
    let uri = `${this.baseURI}/productComment/${id}`;
    return this.http.get<any>(uri)
    .pipe(
      switchMap(coms=>{
        return of(coms["comments"] as ProductComment[]);
      })
    );
  }
}
