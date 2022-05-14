import { environment } from 'src/environments/environment';
import { ProductPost, Like } from './../../../model/interface/ProductPost';
import { animate, transition, trigger, keyframes } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit, SimpleChanges, OnChanges, Renderer2 } from '@angular/core';
import { TinderLayoutService } from 'src/app/service/layout-service/tinder-layout.service';
import * as kf from '../../keyframes';
import { NzCarouselComponent, NzCarouselModule } from 'ng-zorro-antd/carousel';

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

  //even ngif or some change, can get the ref
  @ViewChild("card") card!: ElementRef;
  @ViewChild("carousel") carousel!: NzCarouselComponent;
  @ViewChild("status") status!: ElementRef;

  statusOriginalHeight!: number;
  statusLastHeight!: number;
  statusHeight: string;
  superDetecterOriginalBottom: string;
  superDetecterBottom: string;


  imgBaseURL: string = environment.imgBase;

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
  isSuperLikeSpanded: boolean = false;
  superIsDragging: boolean = false;
  isInfoOpened: boolean = false;

  isLoading: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {

  }

  constructor(
    private tinderLayoutService: TinderLayoutService,
    private rederer: Renderer2
  ) {
    this.rotateDeg = 0;
    this.opacityPercent = 1;
    this.initX = 0;
    this.initY = 0;
    this.x = this.initX;
    this.y = this.initY;
    this.lastX = this.x;
    this.lastY = this.y;

    this.statusHeight = "8%";
    this.superDetecterOriginalBottom = this.statusHeight;
    this.superDetecterBottom = this.statusHeight;
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.statusOriginalHeight = (this.status.nativeElement as HTMLElement).offsetHeight;
    this.statusLastHeight = this.statusOriginalHeight;

    //first trigger, in order to fix the bug on mobile
    this.handleDragSuperLike({deltaY: -50, isFinal: true});
  }

  ngOnDestroy(): void {

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
    //need to filter the super-like-drag
    //maybe set a detecter
    if(!this.isDragable || this.superIsDragging){
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
    this.superIsDragging = true;
    let deltaY = event.deltaY;
    let finalHeight = this.statusLastHeight+(-deltaY); //main calculating
    let cardHeight = (<HTMLElement>this.card.nativeElement).offsetHeight;

    if(this.superIsDragging){
      finalHeight = finalHeight > this.statusOriginalHeight ? finalHeight : this.statusOriginalHeight+50;
      this.statusHeight = finalHeight+"px";
      this.superDetecterBottom = finalHeight+"px";
    }

    if(event.isFinal){
      if(finalHeight >= 5*cardHeight/10){
        this.isSuperLikeSpanded = true;
        finalHeight = 7*cardHeight/10;

      }else{
        finalHeight = this.statusOriginalHeight;
        this.isSuperLikeSpanded = false;
      }
      this.statusHeight = finalHeight+"px";
      this.superDetecterBottom = finalHeight+"px";

      this.statusLastHeight = finalHeight;
      this.superIsDragging = false;
    }
  }

  openInfo()
  {
    this.isInfoOpened = true;
  }

  closeInfo(event: any)
  {
    this.isInfoOpened = false;
  }

  imgLoaded()
  {
    this.isLoading = false;
  }

  sleep(ms: number)
  {
    return new Promise(resolve=>{setTimeout(resolve, ms);})
  }
}
