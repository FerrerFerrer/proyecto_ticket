import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MenuTopbarComponent } from './components/menu-topbar/menu-topbar.component';
import { InterAdminComponent } from './components/inter-admin/inter-admin.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CrudComponent } from './components/crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    LoginComponent,
    MenuTopbarComponent,
    InterAdminComponent,
    HomeComponent,
    DashboardComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RecaptchaModule,
    NgxCaptchaModule,
    HttpClientModule
  ],
  providers: [{ 
    provide: RECAPTCHA_SETTINGS,
    useValue: '6LcWByglAAAAAOWXTSiXQo7ve_uipxdKe5j1J8wm'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
