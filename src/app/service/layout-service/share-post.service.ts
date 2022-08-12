import { IOrderItem } from 'src/app/model/DTO/OrderItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharePostService {
  orderItem?: IOrderItem;

  constructor() {
  }

  setOrderItem(orderItem: IOrderItem) {
    this.orderItem = orderItem;
  }

  getOrderItem(){
    return this.orderItem;
  }

  clearOrderItem(){
    this.orderItem = undefined;
  }
}
