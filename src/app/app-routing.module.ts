import { RouteAuthGuard } from './auth/guards/route-auth.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/compoenents/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], //use hash, so that server can know component/module routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
