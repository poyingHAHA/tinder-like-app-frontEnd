import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input('article') article:string = ''; //from post

  brief: string[] = [];
  isShow: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    if(this.article.length > 30){
      this.isShow = false;
      this.brief = this.article.substring(0, 31).split('\n');

    }
  }

  isLast(str: string, arr: string[]): boolean{
    return arr.indexOf(str) >= arr.length-1;
  }

  showMore()
  {
    this.isShow = true;
  }

}
