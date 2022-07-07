import { ProfileLayoutService } from './../../../service/layout-service/profile-layout.service';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Output('collapse-settings') collapseSettings: EventEmitter<boolean>;

  isVisible: boolean;

  constructor(
    private authService: AuthService,
    private profileLayoutService: ProfileLayoutService
  ) {
    this.collapseSettings = new EventEmitter<boolean>();
    this.isVisible = false;
  }

  ngOnInit(): void {
  }

  back()
  {
    this.collapseSettings.emit(false);
  }

  logout()
  {
    this.authService.logout();
    location.reload();
  }

  //a big component changes its content when different option activated
  changeOption(type: string): void
  {
    this.profileLayoutService.setOption(type);
  }

}
