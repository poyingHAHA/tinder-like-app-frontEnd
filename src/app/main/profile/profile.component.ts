import { environment } from 'src/environments/environment';
import { ProfileLayoutService } from './../../service/layout-service/profile-layout.service';
import { Buyer } from './../../model/interface/Buyer';
import { first, Subject, takeUntil } from 'rxjs';
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

  buyer!: Buyer;

  isSpandSettings: boolean;
  isSpandOptionContent: boolean;

  destroy$: Subject<any>;

  //need to handle buyer and shop

  constructor(
    private _route: Router,
    private buyerService: BuyerService,
    private profileLayoutService: ProfileLayoutService
  )
  {
   this.isSpandSettings = false;
   this.isSpandOptionContent = false;
   this.destroy$ = new Subject<any>();
   this.buyerService.getBuyer()
    .pipe(first())
    .subscribe(buyer=>{
      this.buyer = buyer;
    });
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
