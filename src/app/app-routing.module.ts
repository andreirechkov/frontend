import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent, ChatComponent, RegistrationComponent } from '../app/modules/modules';
import { HomeComponent, CutawayComponent } from '../app/core/core-index';
import { AuthLayoutComponent, SiteLayoutComponent } from '../app/shared/shared';

import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', component: CutawayComponent },
      { path: 'login', component: SignComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  {
    path: '', component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'chat-messages', component: ChatComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
