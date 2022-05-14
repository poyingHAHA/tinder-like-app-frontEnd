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

const exportComponents:any[] = [
  PostComponent,
  BigPostComponent,
  SharePostComponent,
  LoaderSpinerComponent,
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
    MoreContentDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
  ],
  exports:[
    exportComponents,
    exportModules,
    exportDirectives
  ]
})
export class ShareModule { }
