import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutawayComponent } from "./core/cutaway/cutaway.component";
import { SignRegistrComponent } from "./modules/sign-registr/sign-registr.component";


const routes: Routes = [
  { path: '', component: CutawayComponent },
  { path: 'sign-register', component: SignRegistrComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
