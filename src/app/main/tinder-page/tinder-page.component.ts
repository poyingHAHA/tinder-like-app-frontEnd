import { ProductPost } from './../../model/interface/ProductPost';
import { PostService } from './../../service/post-service/post.service';
import { tinderEvent } from './../../service/layout-service/tinder-layout.service';
import { TinderLayoutService } from '../../service/layout-service/tinder-layout.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import 'hammerjs';
import { Subscription, Subject, Observable, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-tinder-page',
  templateUrl: './tinder-page.component.html',
  styleUrls: ['./tinder-page.component.css']
})
export class TinderPageComponent implements OnInit, OnDestroy {

  //place in card info
  //add-> unshift往頭加(queue)
  cardsInfo: ProductPost[];

  imgBaseURL: string = "https://cf.shopee.tw/file/";

  likes: ProductPost[] = [];
  dislikes: ProductPost[] = [];
  top: number;
  hisList: ProductPost[] = [];

  likeHis: boolean = true;
  dislikeHis: boolean = false;

  destroy$: Subject<any>;
  actionSub$: Subject<tinderEvent>;
  swipeSubs$?: Subscription;
  clickSubs$?: Subscription;

  isHistoryOpen: boolean = false;
  isLoading: boolean = true;

  constructor(
    private tinderLayoutService: TinderLayoutService,
    private postService: PostService
  ) {
    this.actionSub$ = new Subject<tinderEvent>();
    this.destroy$ = new Subject<any>();
    this.cardsInfo = [];
    this.top = 0;
  }

  ngOnInit(): void {
    this.tinderLayoutService.getClickObs().pipe(takeUntil(this.destroy$)).subscribe(this.actionSub$);
    this.tinderLayoutService.getSwipeObs().pipe(takeUntil(this.destroy$)).subscribe(this.actionSub$);

    // observable <-subscribe- subject -subscribe(addObserver)-> observer
    this.actionSub$.subscribe(event=>{
      //一定是最上面的人發生event
      let card = this.cardsInfo[this.top];
      if(card && event.type == "like")
      {
        this.likes.push(card);
        this.top = this.top<1 ? 0 : this.top-1;
      }else if(card && event.type == "dislike")
      {
        this.dislikes.push(card);
        this.top = this.top<1 ? 0 : this.top-1;
      }
    });

    this.postService.getProductPostsRandomly(15)
    .pipe(takeUntil(this.destroy$))
    .subscribe(posts=>{
      if(posts!=null)
      {
        this.isLoading = false;
      }
      this.cardsInfo = posts;
      this.top = this.cardsInfo.length-1;
    });
  }

  showHistory()
  {
    this.isHistoryOpen = !this.isHistoryOpen;
    this.hisList = this.likes;
  }

  changeHistoryMode(type: string)
  {
    switch(type)
    {
      case "like":
        this.likeHis = true;
        this.dislikeHis = false;
        this.hisList = this.likes;
        break;
      case "dislike":
        this.dislikeHis = true;
        this.likeHis = false;
        this.hisList = this.dislikes;
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.actionSub$.complete();
  }
}
