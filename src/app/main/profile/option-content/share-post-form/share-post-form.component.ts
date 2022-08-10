import { Subject, takeUntil } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileLayoutService } from 'src/app/service/layout-service/profile-layout.service';
import { OrderService } from 'src/app/service/order-service/order.service';
import { IOrderItem } from 'src/app/model/DTO/OrderItem';

@Component({
  selector: 'app-share-post-form',
  templateUrl: './share-post-form.component.html',
  styleUrls: ['./share-post-form.component.css']
})
export class SharePostFormComponent implements OnInit {
  orderItems:IOrderItem[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrderItems();
  }

  getOrderItems(){
    this.orderService.getOrderItems().subscribe({
      next: response => {
        this.orderItems = response;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
