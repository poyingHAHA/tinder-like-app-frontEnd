import { ProductPost } from 'src/app/model/interface/ProductPost';
import { PostService } from './../../../service/post-service/post.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, of, takeWhile, Subject, takeUntil, repeatWhen, skip, map } from 'rxjs';

interface searchFactor{
  key: string,
  type: "search" | "getSearch"
}

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  @Input('searchState') searchState: "ready" | "autofill" | "result";
  @Input('keyword') keyword: string;

  activeBtn: {[key: string]: boolean} = {
    'item': true,
    'account': false
  };

  destroy$: Subject<any>;

  autoFill$: Observable<string[]>;
  autoFillSubject: BehaviorSubject<string>;

  search$: Observable<ProductPost[]>;
  searchSubject: BehaviorSubject<searchFactor>;

  constructor(
    private postService: PostService
  ) {
    this.destroy$ = new Subject<any>();

    this.searchState = "ready";
    this.keyword = "";

    this.autoFillSubject = new BehaviorSubject<string>(this.keyword);
    this.autoFill$ = this.autoFillSubject.pipe(
      takeUntil(this.destroy$),
      switchMap((key: string)=>{
        if(key!="" && key.trim()!=""){
          return this.postService.searchPost(key).pipe(
            switchMap(res=>of(res.map(x=>x.name).splice(0,10)))
          );
        }else{
          return of([]);
        }
      })
    );

    this.searchSubject = new BehaviorSubject<searchFactor>({key: this.keyword, type: "search"});
    this.search$ = this.searchSubject.pipe(
      takeUntil(this.destroy$),
      switchMap((factor: searchFactor)=>{
        if(factor.key!="" && factor.key.trim()!=""){
          if(factor.type=="search"){
            return this.postService.searchPost(factor.key);
          }else if(factor.type=="getSearch"){
            //specific name search
            return this.postService.getSearchPost(factor.key);
          } else{
            return of([]);
          }
        }else{
          return of([]);
        }
      })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.searchState=='autofill'){
      this.autoFillSubject.next(this.keyword);
    }else if(this.searchState=='result'){
      this.searchSubject.next({
        key: this.keyword,
        type: "search"
      });
    }
  }

  ngOnInit(): void {

  }

  searchItem(name: string)
  {
    this.searchState = 'result';
    this.searchSubject.next({
      key: name,
      type: "getSearch"
    });
  }

  changeMode(type: string)
  {
    Object.entries(this.activeBtn).forEach(item=>{
      this.activeBtn[item[0]] = false;
    });

    switch(type)
    {
      case 'item':
        this.activeBtn['item'] = true;
        break;
      case 'account':
        this.activeBtn['account'] = true;
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
