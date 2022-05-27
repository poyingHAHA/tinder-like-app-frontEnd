import { Register } from './../../models/register';
import { RegisterService } from './../../services/register.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  gender: string;

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
    private router: Router,
    private registerService: RegisterService
  ) {
    this.gender = "Male";
  }

  ngOnInit(): void {
  }

  signup()
  {
    let register: Register={
      account: this.registerForm.value.name,
      email: this.registerForm.value.email,
      gender: this.gender,
      password: this.registerForm.value.password,
    };

    this.registerService.register(register).subscribe(res=>{
      if(res.success){
        // check email
        this.router.navigate(['check-email']);
      }else{
        console.log(res);
      }
    });
  }

  switchToLogin()
  {
    this.router.navigate(['login']);
  }

  changeGender(gender: string)
  {
    this.gender = gender;
  }

  seePassword()
  {
    this.isSeePassword = !this.isSeePassword;
  }

}
