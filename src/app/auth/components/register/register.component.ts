import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  gender: String;

  isSeePassword: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-z0-9A-Z]+')])
  });

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  constructor(
    private router: Router
  ) {
    this.gender = "Male";
  }

  ngOnInit(): void {
  }

  signup()
  {
    //regex email and password
    console.log("sign up!");
    console.log(this.registerForm.value);
    console.log(this.gender);
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
