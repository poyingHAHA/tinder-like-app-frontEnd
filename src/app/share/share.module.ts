import { ImgloadDirective } from './../directives/imgload.directive';
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
  LoaderSpinerComponent
];
const exportModules:any[] = [
  FormsModule,
  NzIconModule
];
const exportDirectives: any[]=[
  ImgloadDirective
]

@NgModule({
  declarations: [
    PostComponent,
    BigPostComponent,
    SharePostComponent,
    LoaderSpinerComponent,
    ImgloadDirective
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
