import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { TreeMapComponent } from './tree-map/tree-map.component';
import { ShareModule } from 'src/app/share/share.module';
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [
    SearchComponent,
    TreeMapComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ShareModule
  ]
})
export class SearchModule { }
