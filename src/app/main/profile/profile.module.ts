import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ShareModule } from 'src/app/share/share.module';
import { SettingsComponent } from './settings/settings.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { OptionContentComponent } from './option-content/option-content.component';
import { EditProfileComponent } from './option-content/edit-profile/edit-profile.component';
import { EditStatusComponent } from './option-content/edit-profile/edit-status/edit-status.component';
import { SharePostFormComponent } from './option-content/share-post-form/share-post-form.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    OptionContentComponent,
    EditProfileComponent,
    EditStatusComponent,
    SharePostFormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzIconModule,
    ShareModule,
    SwiperModule,
    NzModalModule,
    ReactiveFormsModule,
    NzCardModule
  ]
})
export class ProfileModule { }
