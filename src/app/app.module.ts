import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MenuTopbarComponent } from './components/menu-topbar/menu-topbar.component';
import { InterAdminComponent } from './components/inter-admin/inter-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    LoginComponent,
    MenuTopbarComponent,
    InterAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
