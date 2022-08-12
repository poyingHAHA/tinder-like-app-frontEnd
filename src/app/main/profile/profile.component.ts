import { PostService } from './../../service/post-service/post.service';
import { ProductPost } from 'src/app/model/interface/ProductPost';
import { environment } from 'src/environments/environment';
import { ProfileLayoutService } from './../../service/layout-service/profile-layout.service';
import { Buyer } from './../../model/interface/Buyer';
import { first, Subject, takeUntil, Observable, mergeMap, of } from 'rxjs';
import { BuyerService } from './../../service/buyer-service/buyer.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Pagination, SwiperOptions } from "swiper";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isSpandSettings: boolean;
  isSpandOptionContent: boolean;

  buyer$: Observable<Buyer>;
  buyerPic$: Observable<string>;
  destroy$: Subject<any>;

  testPost$: Observable<ProductPost[]>;

  //need to handle buyer and shop

  constructor(
    private _route: Router,
    private buyerService: BuyerService,
    private profileLayoutService: ProfileLayoutService,
    private postService: PostService
  )
  {
   this.isSpandSettings = false;
   this.isSpandOptionContent = false;
   this.destroy$ = new Subject<any>();
   this.buyer$ = this.buyerService.getBuyer();
   this.buyerPic$ = this.buyer$.pipe(mergeMap(b=>of(b.profilePic)));
   this.testPost$ = postService.getProductPostsRandomly(4);
  }

  ngOnInit(): void {
    this.profileLayoutService.getOption$()
    .pipe(takeUntil(this.destroy$))
    .subscribe(type=>{
      if(type != ""){
        this.isSpandOptionContent = true;
      }
    })
  }

  spandSetting()
  {
    this.isSpandSettings = true;
  }

  collapseSettings(event: boolean)
  {
    this.isSpandSettings = event;
  }

  collapseOptionContent(event: boolean)
  {
    this.isSpandOptionContent = event
  }

  counter(n: number)
  {
    return new Array(n);
  }

  //a big component changes its content when different option activated
  changeOption(type: string): void
  {
    this.profileLayoutService.setOption(type);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
