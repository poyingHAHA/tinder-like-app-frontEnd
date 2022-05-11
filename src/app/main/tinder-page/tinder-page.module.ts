import { ShareModule } from 'src/app/share/share.module';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { TinderPageRoutingModule } from './tinder-page-routing.module';
import { TinderPageComponent } from './tinder-page.component';
import { TinderCardComponent } from './tinder-card/tinder-card.component';
import { SwiperModule } from 'swiper/angular';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ProductInfoComponent } from './tinder-card/product-info/product-info.component';

@NgModule({
  declarations: [
    TinderPageComponent,
    TinderCardComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    TinderPageRoutingModule,
    NzIconModule,
    SwiperModule,
    NzCarouselModule,
    NzProgressModule,
    ShareModule
  ]
})
export class TinderPageModule { }
