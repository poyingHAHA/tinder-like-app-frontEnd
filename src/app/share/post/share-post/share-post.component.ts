import { ProductPost } from './../../../model/interface/ProductPost';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css']
})
export class SharePostComponent implements OnInit {
  @Input('post') post?: ProductPost; //to get product info
  @Input('coverImg') cover = new Input();
  @Input('isBigPost') isBigPost?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
