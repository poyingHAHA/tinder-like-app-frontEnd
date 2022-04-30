import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user-service/user.service';
import SwiperCore, { Pagination, SwiperOptions } from "swiper";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _route: Router
  )
  {}

  ngOnInit(): void {

  }

}
