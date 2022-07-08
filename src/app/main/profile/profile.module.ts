import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ShareModule } from 'src/app/share/share.module';
import { PostComponent } from 'src/app/share/post/post.component';
import { SettingsComponent } from './settings/settings.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { OptionContentComponent } from './option-content/option-content.component';
import { EditProfileComponent } from './option-content/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    OptionContentComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzIconModule,
    ShareModule,
    SwiperModule,
    ShareModule,
    NzModalModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
