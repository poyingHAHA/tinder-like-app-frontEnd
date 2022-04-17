import { NavigationEnd, RouteConfigLoadEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeList: any={
    'home': true,
    'tinder-page': false,
    'shop': false,
    'search': false,
    'like': false,
    'profile': false
  };

  constructor(private router: Router) {
    router.events.subscribe((event: any)=>{
      if(event instanceof NavigationEnd){
        let path = event.url.split('/');
        if(path.length > 2){
          this.activeIcon(path[2]);
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
