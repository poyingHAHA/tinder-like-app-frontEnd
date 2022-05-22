import { ProductPost } from './../../model/interface/ProductPost';
import { PostService } from './../../service/post-service/post.service';
import { tinderEvent } from './../../service/layout-service/tinder-layout.service';
import { TinderLayoutService } from '../../service/layout-service/tinder-layout.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import 'hammerjs';
import { Subscription, Subject, Observable, takeUntil, filter, takeWhile, BehaviorSubject } from 'rxjs';

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

  likes: {post: ProductPost, like: boolean}[] = [];
  dislikes: {post: ProductPost, like: boolean}[] = [];
  top: number;
  hisList: {post: ProductPost, like: boolean}[] = [];

  likeHis: boolean = true;
  dislikeHis: boolean = false;

  destroy$: Subject<any>;
  actionSub$: Subject<tinderEvent>;
  swipeSubs$?: Subscription;
  clickSubs$?: Subscription;
  loadMoreSub$: BehaviorSubject<any>;

  isHistoryOpen: boolean = false;
  isLoading: boolean = true;

  constructor(
    private tinderLayoutService: TinderLayoutService,
    private postService: PostService
  ) {
    this.cardsInfo = [];
    this.top = 0;
    this.actionSub$ = new Subject<tinderEvent>();
    this.destroy$ = new Subject<any>();
    this.loadMoreSub$ = new BehaviorSubject<any>(this.top);
  }

  ngOnInit(): void {
    //first init top=remain=0
    this.loadMoreSub$
    .pipe(takeUntil(this.destroy$))
    .subscribe(remain=>{
      if(remain<=4){
        let takedPices = this.cardsInfo.length-(this.top+1); //之前拿過的張數
        let loadPost = this.postService.getProductPostsRandomly(10)
        .subscribe(posts=>{
          if(posts!=null)
          {
            this.isLoading = false;
          }
          this.cardsInfo = posts.concat(this.cardsInfo);
          this.top = remain===0?this.cardsInfo.length-1:this.cardsInfo.length-takedPices-1;
          loadPost.unsubscribe();
        });
      }
    });

    this.tinderLayoutService.getClickObs().pipe(takeUntil(this.destroy$)).subscribe(this.actionSub$);
    this.tinderLayoutService.getSwipeObs().pipe(takeUntil(this.destroy$)).subscribe(this.actionSub$);

    // observable <-subscribe- subject -subscribe(addObserver)-> observer
    this.actionSub$.subscribe(event=>{
      //一定是最上面的人發生event
      let card = this.cardsInfo[this.top];
      if(card && event.type == "like")
      {
        this.likes.push({post: card, like: true});
        this.top = this.top<1 ? 0 : this.top-1;
      }else if(card && event.type == "dislike")
      {
        this.dislikes.push({post: card, like: false});
        this.top = this.top<1 ? 0 : this.top-1;
      }

      //剩下五張時 開始撈新資料
      if(this.top<=4){
        this.loadMoreSub$.next(this.top);
      }
    });
  }

  showHistory()
  {
    this.isHistoryOpen = !this.isHistoryOpen;
    this.changeHistoryMode("like");
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

  resetHisList()
  {
    let toDis = this.likes.filter(x => x.like==false);
    let toLik = this.dislikes.filter(x => x.like==true);

    this.likes = this.likes.concat(toLik);
    this.dislikes = this.dislikes.concat(toDis);

    this.likes = this.likes.filter(x => x.like==true);
    this.dislikes = this.dislikes.filter(x => x.like==false);

    setTimeout(() => {
      this.hisList = this.likeHis?this.likes:this.dislikes;
    }, 300);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.actionSub$.complete();
  }
}
