import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { TinderPageRoutingModule } from './tinder-page-routing.module';
import { TinderPageComponent } from './tinder-page.component';
import { TinderCardComponent } from './tinder-card/tinder-card.component';
import { SwiperModule } from 'swiper/angular';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  declarations: [
    TinderPageComponent,
    TinderCardComponent
  ],
  imports: [
    CommonModule,
    TinderPageRoutingModule,
    NzIconModule,
    SwiperModule,
    NzCarouselModule,
    NzProgressModule
  ]
})
export class TinderPageModule { }
