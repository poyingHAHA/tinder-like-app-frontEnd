import { TinderService } from './../../service/tinder-service/tinder.service';
import { BigPostComponent } from './../../share/post/big-post/big-post.component';
import { mergeMap, Subject, takeUntil, tap, Observable, first, BehaviorSubject } from 'rxjs';
import { PostService } from './../../service/post-service/post.service';
import { ProductPost } from './../../model/interface/ProductPost';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import Swiper core and required modules
import Swiper, { SwiperOptions, Pagination } from 'swiper';

Swiper.use([Pagination])
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: ProductPost[];

  destroy$: Subject<any>;
  reGetPostSubject: BehaviorSubject<number>;
  loadPost$: Observable<ProductPost[]>;

  // make "description" class no swipe, in case of spanding content
  config: SwiperOptions = {
    direction: "vertical",
    noSwipingClass: "description",
    pagination: true
  };

  constructor(
    private postService: PostService
  ) {
    this.posts = [];
    this.destroy$ = new Subject<any>();
    this.reGetPostSubject = new BehaviorSubject<number>(10);
    this.loadPost$ = this.reGetPostSubject.pipe(
      takeUntil(this.destroy$),
      mergeMap(postNum=>{
        return this.postService.getProductPostsRandomly(postNum).pipe(first());
      })
    );
  }

  ngOnInit(): void {
    this.loadPost$.subscribe(posts=>{
      this.posts = this.posts.concat(posts);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  onSlideChange(event: number)
  {
    if(event-1 == this.posts.length-1-2){
      this.reGetPostSubject.next(10);
    }
  }
}
