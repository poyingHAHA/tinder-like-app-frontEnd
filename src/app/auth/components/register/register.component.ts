import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  gender: String;
  password: String;

  isSeePassword: boolean = false;

  constructor(
    private router: Router
  ) {
    this.name = "";
    this.gender = "Male";
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  signup()
  {
    //regex email and password

  }

  switchToLogin()
  {
    this.router.navigate(['login']);
  }

  changeGender(gender: String)
  {
    this.gender = gender;
  }

  seePassword()
  {
    this.isSeePassword = !this.isSeePassword;
  }

}
