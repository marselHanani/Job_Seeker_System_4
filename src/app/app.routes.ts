import { Routes } from '@angular/router';
import { HomeComponent } from './modules/public/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';

export const routes: Routes = [
  {path: '', component:HomeComponent, title:'Home'},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'login',component:RegisterComponent, title:'Login'},
  {path:'**', redirectTo:'notfound', pathMatch:'full'}
];
