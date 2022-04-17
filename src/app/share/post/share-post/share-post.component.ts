import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/model/interface/IPost';
import { IProduct } from 'src/app/model/interface/IProduct';

@Component({
  selector: 'app-share-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css']
})
export class SharePostComponent implements OnInit {
  @Input('post') post?: IPost; //to get product info
  @Input('coverImg') cover = new Input();
  @Input('isBigPost') isBigPost?: boolean;

  product: IProduct ={
    productID: 'test',
    productName: 'name',
    price: 899,
    rate: 4.6,
    images: [],
    labels: []
  }

  constructor() { }

  ngOnInit(): void {
  }

}
