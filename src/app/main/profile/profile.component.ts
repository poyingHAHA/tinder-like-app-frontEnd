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

  testText: string = `呂凱特曾提出，生命不可能有兩次，但許多人連一次也不善於度過。
    請諸位將這段話在心中默念三遍。這樣看來，問題的核心究竟是什麼？
    我認為，我們都知道，只要有意義，那麼就必須慎重考慮。深入的探討買家，是釐清一切的關鍵。
    看看別人，再想想自己，會發現問題的核心其實就在你身旁。
  `;

  isSpandSettings: boolean;

  //need to handle buyer and shop

  constructor(
    private _route: Router
  )
  {
   this.isSpandSettings = false;
  }

  ngOnInit(): void {

  }

  spandSetting()
  {
    this.isSpandSettings = true;
  }

  collapseSettings(event: boolean)
  {
    this.isSpandSettings = event;
  }
}
