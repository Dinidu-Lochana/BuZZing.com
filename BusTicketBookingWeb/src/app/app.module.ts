import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoNgZorroAndModule } from './DemoNgZorroAndModule';
import { SignupClientComponent } from './basic/components/signup/signup-client/signup-client.component';
import { SignupCompanyComponent } from './basic/components/signup/signup-company/signup-company.component';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReviewComponent } from './review/review.component';
import { HomePageComponent } from './basic/components/home-page/home-page.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupClientComponent,
    SignupCompanyComponent,
    AdDetailComponent,
    ReviewComponent,
    HomePageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAndModule,
    ReactiveFormsModule,
    NzButtonModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
