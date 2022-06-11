import { Component, Input, OnInit } from '@angular/core';
import * as ProductPostModel from 'src/app/model/interface/ProductPost';


@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.css']
})
export class TreeMapComponent implements OnInit {
  @Input('posts') posts?: ProductPostModel.ProductPost[];
  @Input('evenOrOdd') evenOrOdd!: number;

  constructor() { }

  ngOnInit(): void {
    this.posts?.sort((x, y)=>{
      return y.rating.rating_star - x.rating.rating_star; //最高分排前面
    });
  }

}
