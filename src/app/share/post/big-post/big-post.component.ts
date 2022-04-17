import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-share-big-post',
  templateUrl: './big-post.component.html',
  styleUrls: ['./big-post.component.css']
})
export class BigPostComponent implements OnInit {
  //[ the index ]: the value
  iconState: {[key: string]: boolean} = {
    "like": false,
    "comment": false,
    "shop": false
  };

  constructor() { }

  ngOnInit(): void {
  }

  changeMode(type: string): void
  {
    this.iconState[type] = !this.iconState[type];
  }
}
