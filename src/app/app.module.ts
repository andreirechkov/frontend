import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { CarouselModule } from 'angular-bootstrap-md';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

import { CutawayComponent, SignComponent, RegistrationComponent, HeaderComponent } from './core/components/core-index';
import { HomeComponent, AllUserComponent, ChatComponent,
  PersonComponent, MapComponent, SettingComponent, VacancyComponent }
  from './modules/page/page'
import { ChatContentComponent, SettingEditComponent,
  CreateNewsComponent, SettingCreateComponent, DeleteNewsComponent, EditNewsComponent, ArtCommandComponent
} from './modules/components/components'
import { AuthLayoutComponent, SiteLayoutComponent, TokenInterceptor } from '../app/shared/shared';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    SettingCreateComponent,
    VacancyComponent,
    DeleteNewsComponent,
    EditNewsComponent,
    ArtCommandComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        AppRoutingModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBxqRMxNtjl9IpFecQviqXuBYLE0yTCj28'
        }),
        HttpClientModule,
        ReactiveFormsModule,
        BsDropdownModule,
        FormsModule,
        CarouselModule,
        AgmCoreModule,
        MatFormFieldModule,
        MatSelectModule,
        NgSelectModule,
        NgbModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
