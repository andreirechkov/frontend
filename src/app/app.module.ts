import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { CutawayComponent } from './core/cutaway/cutaway.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SignRegisterComponent } from './modules/sign-registr/sign-register.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CutawayComponent,
    HeaderComponent,
    FooterComponent,
    SignRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
