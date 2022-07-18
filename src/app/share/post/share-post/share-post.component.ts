import { environment } from 'src/environments/environment';
import { ProductPost } from './../../../model/interface/ProductPost';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css']
})
export class SharePostComponent implements OnInit {
  @Input('post') post?: ProductPost; //to get product info
  @Input('coverImg') cover?:string;
  @Input('isBigPost') isBigPost?: boolean;

  constructor() { }

  ngOnInit(): void {
    if(!this.cover){
      this.cover=environment.imgBase+this.post?.images[0];
    }
  }

}
