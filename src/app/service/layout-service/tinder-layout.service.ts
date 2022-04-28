import { ProductPost } from './../../model/interface/ProductPost';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface tinderEvent
{
  type: "like" | "dislike",
  cardInfo: ProductPost
}

@Injectable({
  providedIn: 'root'
})

export class TinderLayoutService {
  private swipeSubject = new Subject<tinderEvent>();
  private clickSubject = new Subject<tinderEvent>();

  constructor() { }

  setSwipeEvent(event: tinderEvent): void
  {
    this.swipeSubject.next(event);
  }

  setClickEvent(event: tinderEvent): void
  {
    this.clickSubject.next(event);
  }

  getSwipeObs()
  {
    return this.swipeSubject.asObservable();
  }

  getClickObs()
  {
    return this.clickSubject.asObservable();
  }
}
