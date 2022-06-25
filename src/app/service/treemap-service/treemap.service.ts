import { Observable, mapTo, map, first } from 'rxjs';
import { BuyerService } from './../buyer-service/buyer.service';
import { environment } from 'src/environments/environment';
import { ProductPost } from './../../model/interface/ProductPost';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreemapService {
  baseURI: string;

  constructor(private http: HttpClient, private buyerService: BuyerService) {
    this.baseURI = `${environment.domain}/${environment.baseRoute.treemap}`;
  }

  getTreemapRecommendPost(): Observable<ProductPost[]>
  {
    return this.http.get<ProductPost[]>(`${this.baseURI}/recommendItems/${this.buyerService.getBuyerId()}`);
  }
}
