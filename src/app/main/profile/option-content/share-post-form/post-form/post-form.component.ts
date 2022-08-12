import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderItem } from 'src/app/model/DTO/OrderItem';
import { SharePostService } from 'src/app/service/layout-service/share-post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  orderItem?: IOrderItem;

  constructor(private sharePostService: SharePostService) {

  }

  ngOnInit(): void {
    this.orderItem = this.sharePostService.getOrderItem()
    console.log(this.orderItem);
  }

  ngDestroy(): void {
    this.sharePostService.clearOrderItem();
  }
}
