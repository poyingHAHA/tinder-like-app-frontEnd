import { PostService } from './../../../service/post-service/post.service';
import { BuyerService } from './../../../service/buyer-service/buyer.service';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Shop } from './../../../model/interface/Shop';
import { ShopService } from './../../../service/shop-service/shop.service';
import { map, Subject, take, takeUntil, mergeMap, Observable, repeatWhen, switchMapTo, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductPost } from './../../../model/interface/ProductPost';
import { Component, Input, OnInit, Type, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-share-big-post',
  templateUrl: './big-post.component.html',
  styleUrls: ['./big-post.component.css']
})
export class BigPostComponent implements OnInit, OnDestroy {
  //[ the index ]: the value
  iconState: {[key: string]: boolean} = {
    "like": false,
    "comment": false,
    "shop": false
  };

  @Input('post') post!: ProductPost;

  @ViewChild('carousel') carousel!: NzCarouselComponent;

  destroy$: Subject<any>;
  likeCount$: Observable<number>;
  likeCountSubject: BehaviorSubject<any>;

  imgBase: string = environment.imgBase;
  shop$: Observable<Shop>;

  isImgLoaded: boolean;
  isMoreText: boolean;
  picLoaded: number;

  constructor(
    private shopService: ShopService,
    private buyerService: BuyerService,
    private postService: PostService
  ) {
    this.destroy$ = new Subject();
    this.isImgLoaded = false;
    this.isMoreText = false;
    this.picLoaded = 0;
    this.likeCountSubject = new BehaviorSubject<any>(true);
    this.likeCount$ = new Observable<number>();
    this.shop$ = new Observable<Shop>();
  }

  ngOnInit(): void {
    this.shop$ = this.shopService.getShop(this.post.shopid);

    this.likeCount$ = this.likeCountSubject.pipe(
      switchMapTo(
        this.postService.getSpecificProductPost(this.post._id).pipe(
        takeUntil(this.destroy$),
        repeatWhen(this.likeCountSubject.asObservable),
        map(post=>post.likeCount),)
      )
    );

    this.buyerService.getBuyer().pipe(
      takeUntil(this.destroy$),
      map(buyer=>buyer.likedItems.includes(this.post._id))
    ).subscribe(liked=>{
      if(liked) this.iconState["like"] = true;
      else this.iconState["like"]=false;
    });
  }

  changeMode(type: string): void
  {
    this.iconState[type] = !this.iconState[type];
  }

  prevImg()
  {
    this.carousel.pre();
  }

  nextImg()
  {
    this.carousel.next();
  }

  imgLoaded()
  {
    this.picLoaded++;
    if(this.picLoaded===this.post.images.length){
      this.isImgLoaded = true;
    }
  }

  moreText(event: boolean)
  {
    this.isMoreText = event;
  }

  likeAction()
  {
    //if liked -> unlike, else -> like
    let isLiked$ = this.buyerService.getBuyer().pipe(
      map(buyer=>buyer.likedItems.includes(this.post._id))
    );
    let action$ = isLiked$.pipe(
      mergeMap(liked=>{
        if(liked){
          return this.postService.unlikePost(this.post._id, this.buyerService.getBuyerId());
        }else{
          return this.postService.likePost(this.post._id, this.buyerService.getBuyerId());
        }
      })
    );

    action$.subscribe(res=>{
      this.likeCountSubject.next(true);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
