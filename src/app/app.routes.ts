import { Routes } from '@angular/router';
import { HomeComponent } from './modules/public/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { DashboardComponent } from './modules/job-seeker/dashboard/dashboard.component';

export const routes: Routes = [
  {path: 'home', component:HomeComponent, title:'Home'},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'login',component:LoginComponent, title:'Login'},
  {path:'notfound', component:NotfoundComponent, title:'Not Found'},
  {path: 'dashboard', 
    loadComponent: () =>
      import('./modules/job-seeker/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard'
  },
  {path: 'reports',
    loadComponent: () =>
      import('./modules/job-seeker/reports/reports.component').then(m => m.ReportsComponent),
    title: 'Reports'
  },
  {path:'**', redirectTo:'notfound', pathMatch:'full'}
];
