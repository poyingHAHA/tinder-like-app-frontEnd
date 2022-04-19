import { FormsModule } from '@angular/forms';
import { LoginComponent } from './compoenents/login/login.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



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
    LoginComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    FormsModule
  ]
})
export class AuthModule { }
