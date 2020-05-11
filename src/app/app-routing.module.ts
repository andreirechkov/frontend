import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CutawayComponent, SignComponent, RegistrationComponent } from './core/components/core-index';
import {
  HomeComponent,
  AllUserComponent,
  ChatComponent,
  PersonComponent,
  MapComponent,
  SettingComponent,
  VacancyComponent
} from './modules/page/page';
import { AuthLayoutComponent, SiteLayoutComponent, AuthGuard } from '../app/shared/shared';
import { CreateNewsComponent } from './modules/components/components';

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
      { path: 'users', component: AllUserComponent },
      { path: 'chat-messages', component: ChatComponent },
      { path: 'person', component: PersonComponent },
      { path: 'maps', component: MapComponent },
      { path: 'ad', component: CreateNewsComponent },
      { path: 'vacancy', component: VacancyComponent },
      { path: 'setting', component: SettingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
