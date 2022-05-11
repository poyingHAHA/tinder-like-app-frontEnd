import { ProductPost } from './../../../../model/interface/ProductPost';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  @Output('closeInfo') closeInfo: EventEmitter<any>;
  @Input('post') post!: ProductPost;

  testLabels: string[]=[
    "Stock", "Type", "Size", "Transport fees", "Rate"
  ];
  testDatas: string[]=[
    "600", "一般商品", "S / M / L / XL / 2XL", "$0-$60", "4.6/5.0"
  ];

  constructor() {
    this.closeInfo = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  back()
  {
    this.closeInfo.emit();
  }
}
