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
    private authService: AuthService
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

}
