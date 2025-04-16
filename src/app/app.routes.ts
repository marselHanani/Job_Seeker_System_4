import { Routes } from '@angular/router';
import { HomeComponent } from './modules/public/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';

import { jobSearchPageComponent } from './job-search-page/job-search-page.component';
import { JobDetailComponent } from './job-search-page/job-detail/job-detail.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

import { LoginComponent } from './modules/auth/login/login.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

import { ForgetPasswordComponent } from './modules/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { PostJobComponent } from './modules/employer/post-job/post-job.component';

import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ReportsComponent } from './modules/job-seeker/reports/reports.component';
import { EditProfileComponent } from './modules/job-seeker/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './modules/job-seeker/view-profile/view-profile.component';


export const routes: Routes = [
  {path: 'home', component:HomeComponent, title:'Home'},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'login',component:LoginComponent, title:'Login'},
  {path:'forget-password',component:ForgetPasswordComponent, title:'Forget Password'},
  {path:'reset-password',component:ResetPasswordComponent, title:'Reset Password'},
  {path:'dashboard/post-job', component: PostJobComponent, title:'Post Job'},
  {path:'notfound', component:NotfoundComponent, title:'Not Found'},
  {path: 'dashboard',component:DashboardComponent, title:'Dashboard'},
  {path: 'dashboard/reports',component:ReportsComponent, title:'Reports'},
  {path:'edit-profile',component:EditProfileComponent, title:'Edit Profile'},
  {path:'dashboard/view-profile',component: ViewProfileComponent, title:'View Profile'},
  { path: 'jobs', component: jobSearchPageComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  {path: 'applications', component: MyApplicationsComponent},
  {path:'**', redirectTo:'notfound', pathMatch:'full'}
];
