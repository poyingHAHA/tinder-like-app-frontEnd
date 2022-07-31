import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-panel',
  templateUrl: './comment-panel.component.html',
  styleUrls: ['./comment-panel.component.css']
})
export class CommentPanelComponent implements OnInit {
  @Input('postId') postId: string = ""; //AfterView~~ will project to template

  activeOpt: {[key: string]: boolean};

  constructor() {
    this.activeOpt = {
      "comment": true,
      "shared": false
    };

  }

  ngOnInit(): void {

  }

  changeMode(type: "comment" | "shared")
  {
    for(let key in this.activeOpt)
    {
      this.activeOpt[key] = false;
      if(key==type){
        this.activeOpt[type] = true;
      }
    }
  }

}
