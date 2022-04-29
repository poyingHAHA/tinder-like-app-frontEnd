import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { TinderPageRoutingModule } from './tinder-page-routing.module';
import { TinderPageComponent } from './tinder-page.component';
import { TinderCardComponent } from './tinder-card/tinder-card.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    TinderPageComponent,
    TinderCardComponent
  ],
  imports: [
    CommonModule,
    TinderPageRoutingModule,
    NzIconModule,
    SwiperModule
  ]
})
export class TinderPageModule { }
