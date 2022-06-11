import * as ProductPostModel from './../../model/interface/ProductPost';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-share-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post!: ProductPostModel.ProductPost; //to get product info
  @Input('isGreatest') isGreatest: boolean;

  imgBaseURL: string = `https://cf.shopee.tw/file/`;
  cover!: string;
  rate: number;

  constructor() {
    this.rate = 0;
    this.isGreatest = false;
  }

  //field change
  ngOnChanges(changes: SimpleChanges): void {
    this.cover = this.imgBaseURL + this.post.images[0];
    this.rate =  this.post.rating.rating_star;
    this.rate = parseFloat(this.rate.toFixed(1));
  }

  ngOnInit(): void {

  }

}
