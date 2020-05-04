import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent, ChatComponent, RegistrationComponent } from '../app/modules/modules';
import { HomeComponent, CutawayComponent } from '../app/core/core-index';
import { AuthLayoutComponent, SiteLayoutComponent } from '../app/shared/shared';

import { AuthGuard } from './shared/guard/auth.guard';
import { MapComponent } from './modules/components/map/map.component';
import { PersonComponent } from './modules/components/person/person.component';
import { SettingComponent } from './modules/components/setting/setting.component';
import {CreateNewsComponent} from './modules/components/create-news/create-news.component';
import {AllUserComponent} from './modules/components/all-user/all-user.component';

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
      { path: 'create', component: CreateNewsComponent },
      { path: 'chat-messages', component: ChatComponent },
      { path: 'person', component: PersonComponent },
      { path: 'maps', component: MapComponent },
      { path: 'setting', component: SettingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
