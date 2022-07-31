import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductComment } from 'src/app/model/DTO/ProductComment';
import { CommentService } from 'src/app/service/comment-service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('postId') postId: string = ""; //AfterView~~ will project to template

  activeOpt: {[key: string]: boolean};
  sendText: string="";

  getComment$: Observable<ProductComment[]>;

  constructor(
    private commentService: CommentService
  ) {
    this.activeOpt = {
      "comment": true,
      "shared": false
    };
    this.getComment$ = new Observable<ProductComment[]>();
  }

  ngOnInit(): void {
    this.getComment$ = this.commentService.getProductComment(this.postId);
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

  send()
  {
    alert(this.sendText);
  }
}
