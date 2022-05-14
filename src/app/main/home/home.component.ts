import { mergeMap, Subject, takeUntil, tap } from 'rxjs';
import { PostService } from './../../service/post-service/post.service';
import { ProductPost } from './../../model/interface/ProductPost';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
    this.destroy$ = new Subject();
  }

  ngOnInit(): void {
    this.postService.getProductPostsRandomly(10)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(posts=>{
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
