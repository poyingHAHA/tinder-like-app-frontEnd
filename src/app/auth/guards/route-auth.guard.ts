import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteAuthGuard implements CanActivate, CanLoad {
  //canActivate -> 防止未授權用戶access特定route
  //canLoad -> 防止app lazily load未授權模組

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canLoad();
  }

  canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    return this.authService.isLoggedIn();
  }

}
