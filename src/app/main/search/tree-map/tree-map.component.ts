import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/model/interface/IPost';
import * as ProductPostModel from 'src/app/model/interface/ProductPost';


@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.css']
})
export class TreeMapComponent implements OnInit {
  @Input('posts') posts?: ProductPostModel.ProductPost[];

  constructor() { }

  ngOnInit(): void {

  }

}
