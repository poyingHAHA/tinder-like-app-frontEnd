import { SwiperModule } from 'swiper/angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ShareModule } from 'src/app/share/share.module';
import { PostComponent } from 'src/app/share/post/post.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzIconModule,
    ShareModule,
    SwiperModule,
    ShareModule
  ]
})
export class ProfileModule { }
