import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin, first, tap, map, of } from 'rxjs';
import { IOrderItem } from 'src/app/model/DTO/OrderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURI: string;
  BUYER_ID: string = "BUYER_ID";
  buyerId: string = "";

  constructor(private http: HttpClient) {
    this.baseURI = `${environment.domain}/${environment.baseRoute.buyer}`;
  }

  getOrderItems(): Observable<IOrderItem[]>
  {
    // return this.http.get<string>(`http://127.0.0.1:3000/order/boughtItems/${this.getBuyerId()}`);
    // todo 測試用要刪掉
    let testUri = `http://127.0.0.1:3000/order/boughtItems/6281b017e8d0a0041ba8bbe1`;
    return this.http.get<IOrderItem[]>(testUri)
  }

  getBuyerId(): string
  {
    return localStorage.getItem(this.BUYER_ID) as string;
  }
}
