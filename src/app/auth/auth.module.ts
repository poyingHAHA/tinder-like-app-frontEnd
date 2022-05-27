import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CheckEmailComponent } from './components/check-email/check-email.component';

@NgModule({
  providers:[
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    CheckEmailComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    FormsModule,
    NzDropDownModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
