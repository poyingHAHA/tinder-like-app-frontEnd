import { ProductPost, Like } from './../../../model/interface/ProductPost';
import { Subscription } from 'rxjs';
import { animate, transition, trigger, keyframes } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { TinderLayoutService } from 'src/app/service/layout-service/tinder-layout.service';
import * as kf from '../../keyframes';
import { NzCarouselComponent, NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-tinder-card',
  templateUrl: './tinder-card.component.html',
  styleUrls: ['./tinder-card.component.css'],
  animations:[
    trigger('cardAnimator', [
      transition('* => slideOutLeft', animate(1000, keyframes(kf.slideOutLeft))),
      transition('* => rotateZoomOutLeft', animate(1000, keyframes(kf.rotateZoomOutLeft))),
      transition('* => rotateZoomOutRight', animate(1000, keyframes(kf.rotateZoomOutRight)))
    ])
  ]
})
export class TinderCardComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges{

  //place in product_post or sth else
  @Input('cardInfo') cardInfo!: {name: string};
  @Output('swiped') swipeEvent = new EventEmitter();
  @Input('post') post!: ProductPost;
  @Input('isDragable') isDragable!: boolean;

  @ViewChild("card") card!: ElementRef;
  @ViewChild("carousel") carousel!: NzCarouselComponent;

  clickSubs$?: Subscription;

  imgBaseURL: string = "https://cf.shopee.tw/file/";

  animationState?: string;
  lastX!: number;
  lastY!: number;

  x!: number;
  y!: number;

  initY!: number;
  initX!: number;

  rotateDeg!: number;
  opacityPercent!: number;

  isDragging: boolean = false;
  isOutRight: boolean = false;
  isOutLeft: boolean = false;
  isDelete: boolean = false;
  isDeleting: boolean = false;
  isReset: boolean = false;
  isFading: boolean = false;

  isLoading: boolean = true;

  constructor(private tinderLayoutService: TinderLayoutService) {
    this.rotateDeg = 0;
    this.opacityPercent = 1;
    this.initX = 0;
    this.initY = 0;
    this.x = this.initX;
    this.y = this.initY;
    this.lastX = this.x;
    this.lastY = this.y;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.post != null)
    {
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }

  ngOnInit(): void {

  }

  clickAction(action: string)
  {
    //set isDelete,set isFading

    if(action=="like" && !this.isFading)
    {
      this.isFading = true;
      this.isOutRight = true;
      this.tinderLayoutService.setClickEvent({type: "like", cardInfo: this.post});
      this.sleep(800).then(()=>{this.isDelete=true;});
    }else if(action=="dislike" && !this.isFading)
    {
      this.isFading = true;
      this.isOutLeft = true;
      this.tinderLayoutService.setClickEvent({type: "dislike", cardInfo: this.post});
      this.sleep(800).then(()=>{this.isDelete=true;});
    }
  }

  ngAfterViewInit(): void {

  }

  startAnimation(state: string)
  {
    console.log(state);
    if(!this.animationState){
      this.animationState = state;
    }
  }

  resetAnimationState()
  {
    this.animationState = '';
  }

  handleDrag(event: any)
  {
    if(!this.isDragable){
      return;
    }

    if(!this.isDragging && !this.isDeleting && !this.isReset){
      this.lastX = this.x;
      this.lastY = this.y;
      this.isDragging = true;
    }

    this.x  = this.lastX + event.deltaX;
    this.y = this.lastY + event.deltaY;

    this.resetRotateAndOpacity();

    if(event.isFinal) {
      this.isDragging = false;
      if((this.x>0&&this.x>=150) || (this.x<0&&this.x<=-160) && !this.isDelete){
        this.isDeleting = true;
        if(this.x>0){
          this.isOutRight = true;
          this.tinderLayoutService.setSwipeEvent({type: "like", cardInfo: this.post});
        }else{
          this.isOutLeft = true;
          this.tinderLayoutService.setSwipeEvent({type: "dislike", cardInfo: this.post});
        }
        this.sleep(800).then(()=>this.isDelete=true);
      }else
      {
        this.isReset = true;
        this.sleep(400).then(()=>{
          this.isReset = false;
          this.x = this.initX;
          this.y = this.initY;
          this.resetRotateAndOpacity();
        });
      }
    }
  }

  resetRotateAndOpacity()
  {
    //0~-270px -> 0~20deg
    //溫度計法
    this.rotateDeg = Math.floor(((2/27.0)*this.x)*100)/100;
    this.opacityPercent = Math.floor((1 - Math.abs((1/20.0)*this.rotateDeg))*100)/100;
  }

  prevImg()
  {
    this.carousel.pre();
  }

  nextImg()
  {
    this.carousel.next();
  }

  handleDragSuperLike(event: any)
  {

  }

  sleep(ms: number)
  {
    return new Promise(resolve=>{setTimeout(resolve, ms);})
  }

  ngOnDestroy(): void {

  }
}
