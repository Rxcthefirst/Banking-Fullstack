import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Components/Pages/homepage/homepage.component';
import { LoginComponent } from './Components/Pages/login/login.component';
import { RegisterComponent } from './Components/Pages/register/register.component';
import { NotfoundComponent } from './Components/Pages/notfound/notfound.component';
import { SummaryComponent } from './Components/Pages/summary/summary.component';
import { AccountsComponent } from './Components/Pages/accounts/accounts.component';
import { NavbarComponent } from './Components/Pages/navbar/navbar.component';
import { ProfileComponent } from './Components/Pages/profile/profile.component';
import { DarkModeToggleComponent } from './Components/Pages/dark-mode-toggle/dark-mode-toggle.component';
import { TransferComponent } from './Components/Pages/transfer/transfer.component';
import { ZelleComponent } from './Components/Pages/zelle/zelle.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    SummaryComponent,
    AccountsComponent,
    NavbarComponent,
    ProfileComponent,
    DarkModeToggleComponent,
    TransferComponent,
    ZelleComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


