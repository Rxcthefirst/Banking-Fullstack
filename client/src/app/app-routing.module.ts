import { ProfileComponent } from './Components/Pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Components/Pages/homepage/homepage.component';
import { LoginComponent } from './Components/Pages/login/login.component';
import { NotfoundComponent } from './Components/Pages/notfound/notfound.component';
import { RegisterComponent } from './Components/Pages/register/register.component';
import { SummaryComponent } from './Components/Pages/summary/summary.component';
import { TransferComponent } from './Components/Pages/transfer/transfer.component';
import { ZelleComponent } from './Components/Pages/zelle/zelle.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent 
  },
  {
    path: 'summary',
    component: SummaryComponent
  },

  {
    path:'profile',
    component: ProfileComponent
  },

  {
    path:'homepage',
    component: HomepageComponent
  },
  
  { 
    path: '',   
    redirectTo: '/homepage', 
    pathMatch: 'full' 
  },
  
  {
    path: 'transfer',
    component: TransferComponent
  },

  {
    path: 'zelle',
    component: ZelleComponent
  },

  {
    //* is the wildcard character
    path: "**",
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
