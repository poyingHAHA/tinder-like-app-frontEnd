import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ProductPost } from 'src/app/model/interface/ProductPost';
import Swiper, {SwiperOptions, Pagination, Virtual } from 'swiper';
import { EventsParams, SwiperComponent } from 'swiper/angular';

Swiper.use([Pagination, Virtual])
@Component({
  selector: 'app-share-big-posts',
  templateUrl: './big-posts.component.html',
  styleUrls: ['./big-posts.component.css']
})
export class BigPostsComponent implements OnInit, AfterViewInit{
  @Input('posts') posts: ProductPost[];
  @Input('initialSlide') initSlide?: number;
  @Output('slideChange') slideChange: EventEmitter<number>;

  @ViewChild('swiper') swiper?: SwiperComponent;

  config: SwiperOptions = {
    direction: "vertical",
    noSwipingClass: "description",
    pagination: true,
    virtual: true
  };

  constructor() {
    this.posts = [];
    this.slideChange = new EventEmitter<number>();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if(this.initSlide){
      this.swiper?.swiperRef.slideTo(this.initSlide);
    }
  }

  onSlideChange(event: [swiper: Swiper])
  {
    this.slideChange.emit(event[0].activeIndex);
  }
}
