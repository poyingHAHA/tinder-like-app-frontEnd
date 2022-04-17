import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tinder-like-app';

  constructor(private router:Router){}

  ngOnInit(): void {
    // if(true) {
    //   this.router.navigate(['main']);
    // }
  }
  //判斷user 是否登入 -> 已使用auth guard
  //if true -> /main
  //if false -> /login
}
