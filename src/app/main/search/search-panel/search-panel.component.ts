import { PostService } from './../../../service/post-service/post.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, of, takeWhile } from 'rxjs';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  @Input('searchState') searchState: "ready" | "autofill" | "result";
  @Input('keyword') keyword: string;

  autoFill$: Observable<string[]>;
  autoFillSubject: BehaviorSubject<string>;

  constructor(
    private postService: PostService
  ) {
    this.searchState = "ready";
    this.keyword = "";
    this.autoFillSubject = new BehaviorSubject<string>("");
    this.autoFill$ = this.autoFillSubject.pipe(
      switchMap((key: string)=>{
        if(key!=""){
          return this.postService.searchPost(key).pipe(
            switchMap(res=>of(res.map(x=>x.name).splice(0,20)))
          );
        }else{
          return of([]);
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['keyword']?.currentValue){
      //has keyword changed
      this.autoFillSubject.next(this.keyword);
    }
  }

  ngOnInit(): void {
  }

}
