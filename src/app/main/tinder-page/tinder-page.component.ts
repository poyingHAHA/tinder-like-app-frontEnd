import { tinderEvent } from './../../service/layout-service/tinder-layout.service';
import { TinderLayoutService } from '../../service/layout-service/tinder-layout.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import 'hammerjs';
import { Subscription, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-tinder-page',
  templateUrl: './tinder-page.component.html',
  styleUrls: ['./tinder-page.component.css']
})
export class TinderPageComponent implements OnInit, OnDestroy {
  //place in card info
  test: {name: string}[] = [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'}
  ];

  likes: any[] = [];
  dislikes: any[] = [];
  top: number = this.test.length-1;
  hisList: any[] = [];

  likeHis: boolean = true;
  dislikeHis: boolean = false;

  actionSub$: Subject<tinderEvent>;
  swipeSubs$?: Subscription;
  clickSubs$?: Subscription;

  isHistoryOpen: boolean = false;

  constructor(private tinderLayoutService: TinderLayoutService) {
    this.actionSub$ = new Subject<tinderEvent>();
  }

  ngOnInit(): void {
    this.tinderLayoutService.getClickObs().subscribe(this.actionSub$);
    this.tinderLayoutService.getSwipeObs().subscribe(this.actionSub$);

    // observable <-subscribe- subject -subscribe(addObserver)-> observer
    this.actionSub$.subscribe(event=>{
      //一定是最上面的人發生event
      let card = this.test[this.top];
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
    this.swipeSubs$?.unsubscribe();
  }
}
