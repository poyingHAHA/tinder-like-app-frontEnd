import { Subscription } from 'rxjs';
import { animate, transition, trigger, keyframes } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { TinderLayoutService } from 'src/app/service/layout-service/tinder-layout.service';
import * as kf from '../../keyframes';


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
export class TinderCardComponent implements OnInit, OnDestroy, AfterViewInit{
  //place in product_post or sth else
  @Input('cardInfo') cardInfo!: {name: string};
  @Output('swiped') swipeEvent = new EventEmitter();

  @ViewChild("card") card!: ElementRef;

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
  isReset: boolean = false;

  clickSubs$?: Subscription;

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

  ngOnInit(): void {
    this.clickSubs$ = this.tinderLayoutService.getClickObs().subscribe(event => {
      if(event.cardInfo == this.cardInfo.name)
      {
        if(event.type=="like")
        {
          this.isOutLeft = true;
        }else if(event.type=="dislike")
        {
          this.isOutRight = true;
        }
      }
    });
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
    if(!this.isDragging){
      this.lastX = this.x;
      this.lastY = this.y;
      this.isDragging = true;
    }

    this.x  = this.lastX + event.deltaX;
    this.y = this.lastY + event.deltaY;

    this.resetRotateAndOpacity();

    if(event.isFinal) {
      this.isDragging = false;
      if((this.x>0&&this.x>=150) || (this.x<0&&this.x<=-160)){
        if(this.x>0){
          this.isOutRight = true;
          this.tinderLayoutService.setSwipeEvent({type: "dislike", cardInfo: this.cardInfo.name});
        }else{
          this.isOutLeft = true;
          this.tinderLayoutService.setSwipeEvent({type: "like", cardInfo: this.cardInfo.name});
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

  sleep(ms: number)
  {
    return new Promise(resolve=>{setTimeout(resolve, ms);})
  }

  ngOnDestroy(): void {

  }
}
