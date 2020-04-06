import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutawayComponent } from "./core/cutaway/cutaway.component";
import { SignRegisterComponent } from "./modules/sign-registr/sign-register.component";


const routes: Routes = [
  { path: '', component: CutawayComponent },
  { path: 'sign-register', component: SignRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
