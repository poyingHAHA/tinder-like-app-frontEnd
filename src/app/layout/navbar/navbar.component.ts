import { TinderService } from './../../service/tinder-service/tinder.service';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeList: any={
    'home': false,
    'tinder-page': true,
    'search': false,
    'profile': false
  };

  previousRoute: string = "";

  constructor(private router: Router, private tinderService: TinderService) {
    router.events.subscribe((event: any)=>{
      if(event instanceof NavigationEnd){
        let path = event.url.split('/');

        if(path.length > 2){
          //active icon
          this.activeIcon(path[2]);

          //switch page from tinder page
          if(this.previousRoute === "tinder-page"){
            let subs = this.tinderService.switchPageFromTinder().subscribe(msg=>{
              //console.log(msg);
              subs.unsubscribe();
            })
          }

          this.previousRoute = path[2];
        }
      }
    });
  }

  ngOnInit(): void {
  }

  activeIcon(type: string)
  {
    for(let key in this.activeList)
    {
      if(key === type){
        this.activeList[key] = true;
      }else{
        this.activeList[key] = false;
      }
    }
  }
}
