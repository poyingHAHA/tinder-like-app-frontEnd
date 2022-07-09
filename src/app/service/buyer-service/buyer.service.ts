import { PatchBuyer } from './../../model/DTO/PatchBuyer';
import { Buyer } from './../../model/interface/Buyer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/model/interface/Response';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  baseURI: string;
  BUYER_ID: string = "BUYER_ID";
  buyerId: string = "";

  constructor(private http: HttpClient) {
    this.baseURI = `${environment.domain}/${environment.baseRoute.buyer}`;
  }

  getBuyer(): Observable<Buyer>
  {
    return this.http.get<Buyer>(`${this.baseURI}/buyer?buyerid=${this.getBuyerId()}`);
  }

  patchBuyer(patchBuyer: PatchBuyer): Observable<Buyer>
  {
    return this.http.patch<Buyer>(`${this.baseURI}/profile`, patchBuyer);
  }

  setBuyerId(): void
  {
    if(!this.isHasBuyerId()){
      let sub = this.doGetBuyerId().subscribe(res=>{
        this.buyerId = res.data?(<string>res.data):"";
        this.storeBuyerId();
        sub.unsubscribe();
      });
    }
    return;
  }

  doGetBuyerId(): Observable<Response>
  {
    return this.http.get<Response>(`${this.baseURI}/getid`);
  }

  getBuyerId(): string
  {
    return localStorage.getItem(this.BUYER_ID) as string;
  }

  storeBuyerId(): void
  {
    localStorage.setItem(this.BUYER_ID, this.buyerId);
    return;
  }

  isHasBuyerId(): boolean
  {
    return !!localStorage.getItem(this.BUYER_ID)
  }
}
