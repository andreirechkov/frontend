import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';

import { SignComponent, ChatComponent, RegistrationComponent } from '../app/modules/modules';

import { HomeComponent, CutawayComponent, SidenavComponent } from '../app/core/core-index';

import { AuthLayoutComponent, SiteLayoutComponent, TokenInterceptor } from '../app/shared/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './core/components/header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PersonComponent } from './modules/components/person/person.component';
import { MapComponent } from './modules/components/map/map.component';
import { SettingComponent } from './modules/components/setting/setting.component';
import { ChatContentComponent } from './modules/components/ChatMessages/chat-content/chat-content.component';



@NgModule({
  declarations: [
    AppComponent,
    CutawayComponent,
    SignComponent,
    RegistrationComponent,
    HomeComponent,
    SidenavComponent,
    ChatComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    HeaderComponent,
    PersonComponent,
    MapComponent,
    SettingComponent,
    ChatContentComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        AppRoutingModule,
        TabsModule.forRoot(),
        ChartsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BsDropdownModule,
        FormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
