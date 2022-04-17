import { Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import Swiper, { SwiperOptions, Pagination } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Swiper.use([Pagination]);
  }

  config: SwiperOptions = {
    //pagination: true,
    direction: "vertical"
  };
}
