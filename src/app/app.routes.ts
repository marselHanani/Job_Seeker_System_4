import { Routes } from '@angular/router';
import { HomeComponent } from './modules/public/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { jobSearchPageComponent } from './job-search-page/job-search-page.component';
import { JobDetailComponent } from './job-search-page/job-detail/job-detail.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

export const routes: Routes = [
  {path: '', component:HomeComponent, title:'Home'},
  { path: 'jobs', component: jobSearchPageComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  {path: 'applications', component: MyApplicationsComponent},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'login',component:RegisterComponent, title:'Login'},
  {path:'**', redirectTo:'notfound', pathMatch:'full'}
];
