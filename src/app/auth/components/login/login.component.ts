import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, switchMap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public test: any[] = [];
  loginSubscription: Subscription;
  email: string;
  password: string;
  isSeePassword: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.email = "";
    this.password = "";
    this.loginSubscription = new Subscription();
    this.isSeePassword = false;
  }

  ngOnInit(): void {
    //this.login();
  }

  login()
  {
    this.loginSubscription = this.authService.login({email: this.email, password: this.password})
    .subscribe(success=>{
      if(success){
        console.log("OK");
        this.router.navigate(['/main']);
      }else{
        //pop out error
        console.log("No");
      }
    });
  }

  seePassword()
  {
    this.isSeePassword = !this.isSeePassword;
  }

  switchToSignUp()
  {
    this.router.navigate(['/register']);
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

}
