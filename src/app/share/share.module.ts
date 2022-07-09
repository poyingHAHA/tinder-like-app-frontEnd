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

const exportComponents:any[] = [
  PostComponent,
  BigPostComponent,
  SharePostComponent,
  LoaderSpinerComponent,
  EntireLoaderRollerComponent
];
const exportModules:any[] = [
  FormsModule,
  NzIconModule
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
    EntireLoaderRollerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzCarouselModule
  ],
  exports:[
    exportComponents,
    exportModules,
    exportDirectives
  ]
})
export class ShareModule { }
