import { EntireLoaderRollerComponent } from './../layout/entire-loader-roller/entire-loader-roller.component';
import { MoreContentDirective } from './../directives/more-content/more-content.directive';
import { ImgloadDirective } from '../directives/imgload/imgload.directive';
import { LoaderSpinerComponent } from './../layout/loader-spiner/loader-spiner.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { BigPostComponent } from './post/big-post/big-post.component';
import { SharePostComponent } from './post/share-post/share-post.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { BigPostsComponent } from './post/big-posts/big-posts.component';
import { SwiperModule } from 'swiper/angular';
import { ActionPanelComponent } from './post/big-post/action-panel/action-panel.component';
import { BuyingInfoComponent } from './post/big-post/action-panel/buying-info/buying-info.component';
import { CommentComponent } from './post/big-post/action-panel/comment-panel/comment/comment.component';
import { CommentPanelComponent } from './post/big-post/action-panel/comment-panel/comment-panel.component';
import { SharedComponent } from './post/big-post/action-panel/comment-panel/shared/shared.component';

const exportComponents:any[] = [
  PostComponent,
  BigPostComponent,
  SharePostComponent,
  LoaderSpinerComponent,
  EntireLoaderRollerComponent,
  BigPostsComponent,
];
const exportModules:any[] = [
  FormsModule,
  NzIconModule,
  SwiperModule
];
const exportDirectives: any[]=[
  ImgloadDirective,
  MoreContentDirective
]

@NgModule({
  declarations: [
    PostComponent,
    BigPostComponent,
    SharePostComponent,
    LoaderSpinerComponent,
    ImgloadDirective,
    MoreContentDirective,
    EntireLoaderRollerComponent,
    BigPostsComponent,
    ActionPanelComponent,
    BuyingInfoComponent,
    CommentPanelComponent,
    SharedComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzCarouselModule,
    SwiperModule
  ],
  exports:[
    exportComponents,
    exportModules,
    exportDirectives
  ]
})
export class ShareModule { }
