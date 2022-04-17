import * as ProductPostModel from './../../model/interface/ProductPost';
import { IProduct } from 'src/app/model/interface/IProduct';
import { IPost } from '../../model/interface/IPost';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-share-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post?: ProductPostModel.ProductPost; //to get product info

  imgBaseURL: string = `https://cf.shopee.tw/file/`;
  cover?: string;
  rate?: number;

  constructor() {

  }

  //field change
  ngOnChanges(changes: SimpleChanges): void {
    this.cover = this.imgBaseURL + this.post?.images[0];
    this.rate =  this.post?.rating?.rating_star;
    this.rate = this.rate!=undefined ? Math.floor(this.rate*10)/10 : this.rate;
  }

  ngOnInit(): void {

  }

}
