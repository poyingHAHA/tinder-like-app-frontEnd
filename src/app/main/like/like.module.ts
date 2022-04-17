import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LikeRoutingModule } from './like-routing.module';
import { LikeComponent } from './like.component';


@NgModule({
  declarations: [
    LikeComponent
  ],
  imports: [
    CommonModule,
    LikeRoutingModule
  ]
})
export class LikeModule { }
