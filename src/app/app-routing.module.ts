import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutawayComponent } from "./core/cutaway/cutaway.component";
import { SignRegisterComponent } from "./modules/sign-registr/sign-register.component";
import { HomeComponent } from './core/home/home.component';


const routes: Routes = [
  { path: 'sign-register', component: SignRegisterComponent},
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
