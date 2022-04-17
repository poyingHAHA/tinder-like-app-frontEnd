import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TinderPageComponent } from './tinder-page.component';

const routes: Routes = [
  {path: '', component: TinderPageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TinderPageRoutingModule { }
