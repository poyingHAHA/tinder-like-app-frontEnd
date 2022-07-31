import { BuyerService } from './../../../service/buyer-service/buyer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  loginSubscription: Subscription;
  isSeePassword: boolean;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password') }

  constructor(
    private authService: AuthService,
    private router: Router,
    private buyerService: BuyerService
  ) {
    this.loginSubscription = new Subscription();
    this.isSeePassword = false;
  }

  ngOnInit(): void {
    //this.login();
  }

  login()
  {
    let info = this.loginForm.value;
    this.loginSubscription = this.authService.login({email: info.email, password: info.password})
    .subscribe(success=>{
      if(success){
        console.log("OK");

        // some actions after logined need buyerid
        if(!this.buyerService.isHasBuyerId()){
          this.buyerService.setBuyerId().subscribe(suc=>{
            if(suc){
              this.router.navigate(['/main']);
            }
          });
        }

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
