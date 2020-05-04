import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';

import { SignComponent, ChatComponent, RegistrationComponent } from '../app/modules/modules';

import { HomeComponent, CutawayComponent } from '../app/core/core-index';

import { AuthLayoutComponent, SiteLayoutComponent, TokenInterceptor } from '../app/shared/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './core/components/header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PersonComponent } from './modules/components/person/person.component';
import { MapComponent } from './modules/components/map/map.component';
import { SettingComponent } from './modules/components/setting/setting.component';
import { ChatContentComponent } from './modules/components/ChatMessages/chat-content/chat-content.component';
import { CarouselModule } from 'angular-bootstrap-md';
import { SettingEditComponent } from './modules/components/setting-edit/setting-edit.component';
import { ModalModule } from 'ngx-bootstrap';
import { CreateNewsComponent } from './modules/components/create-news/create-news.component';
import { AllUserComponent } from './modules/components/all-user/all-user.component';
import { SettingCreateComponent } from './modules/components/setting-create/setting-create.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CutawayComponent,
    SignComponent,
    RegistrationComponent,
    HomeComponent,
    ChatComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    HeaderComponent,
    PersonComponent,
    MapComponent,
    SettingComponent,
    ChatContentComponent,
    SettingEditComponent,
    CreateNewsComponent,
    AllUserComponent,
    SettingCreateComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        AppRoutingModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
          // please get your own API key here:
          // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
          apiKey: 'AIzaSyBxqRMxNtjl9IpFecQviqXuBYLE0yTCj28'
        }),
        ChartsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BsDropdownModule,
        FormsModule,
        CarouselModule,
        AgmCoreModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
