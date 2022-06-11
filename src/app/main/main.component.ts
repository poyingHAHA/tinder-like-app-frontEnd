import { BuyerService } from './../service/buyer-service/buyer.service';
import { AuthService } from './../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // <<key point>>
    // here redirect will 'reload again', so when navigate or redirect, it will reload app
    // when login succefully, navigate to main
    // so some important data like auth info
    // should store in localstorage, so that it won't refresh when reload

    //test refresh
    // localStorage.setItem('ACCESS_TOKEN','123');
    // this.http.get<any>('http://localhost:3000/index/protected').subscribe(res=>{
    //   console.log(res);
    // })
  }
}
