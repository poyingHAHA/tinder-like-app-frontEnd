import { RegisterComponent } from './auth/components/register/register.component';
import { RouteAuthGuard } from './auth/guards/route-auth.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children:[
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [RouteAuthGuard],
        canLoad: [RouteAuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], //use hash, so that server can know component/module routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
