import { LoaderSpinerComponent } from './../layout/loader-spiner/loader-spiner.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { ArticleComponent } from './article/article.component';
import { BigPostComponent } from './post/big-post/big-post.component';
import { SharePostComponent } from './post/share-post/share-post.component';

const exportComponents:any[] = [
  PostComponent,
  BigPostComponent,
  CommentComponent,
  ArticleComponent,
  SharePostComponent,
  LoaderSpinerComponent
];
const exportModules:any[] = [
  FormsModule,
  NzIconModule
];

@NgModule({
  declarations: [
    PostComponent,
    CommentComponent,
    ArticleComponent,
    BigPostComponent,
    SharePostComponent,
    LoaderSpinerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule
  ],
  exports:[
    exportComponents,
    exportModules
  ]
})
export class ShareModule { }
