import { BuyerService } from './../buyer-service/buyer.service';
import { Observable } from 'rxjs';
import { ProductPost } from './../../model/interface/ProductPost';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tinder } from 'src/app/model/DTO/Tinder';

@Injectable({
  providedIn: 'root'
})
export class TinderService {
  baseURI: string;

  constructor(
    private http: HttpClient,
    private buyerService: BuyerService
  ) {
    this.baseURI = `${environment.domain}/${environment.baseRoute.tinder}`;
  }

  tinderLike(post: ProductPost): Observable<ProductPost>
  {
    return this.http.post<ProductPost>(`${this.baseURI}/tinderLike`,<Tinder>{
      buyerid: this.buyerService.getBuyerId(),
      labels: post.labels.map(x=>x.display_name),
      feLabels: post.feLabels.map(x=>x.display_name),
      itemid: post._id,
      name: post.name
    });
  }

  tinderDisLike(post: ProductPost): Observable<{updated: number, deleted: number}>
  {
    return this.http.patch<{updated: number, deleted: number}>(`${this.baseURI}/tinderDislike`, <Tinder>{
      buyerid: this.buyerService.getBuyerId(),
      labels: post.labels.map(x=>x.display_name),
      feLabels: post.feLabels.map(x=>x.display_name),
      itemid: post._id,
      name: post.name
    });
  }

  tinderSuperLike(post: ProductPost)
  {
    //return this.http.post<{msg: string}>(`${this.baseURI}/`);

  }

  switchPageFromTinder(): Observable<{msg: string}>
  {
    return this.http.put<{msg: string}>(`${this.baseURI}/switchPageFromTinder`,{
      "buyerid": this.buyerService.getBuyerId()
    });
  }
}
