import { Routes } from '@angular/router';
import { HomeComponent } from './modules/public/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { jobSearchPageComponent } from './modules/job-seeker/job-search-page/job-search-page.component';
import { JobDetailComponent } from './modules/job-seeker/job-search-page/job-detail/job-detail.component';
import { MyApplicationsComponent } from './modules/job-seeker/my-applications/my-applications.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { ForgetPasswordComponent } from './modules/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { PostJobComponent } from './modules/employer/post-job/post-job.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ReportsComponent } from './modules/job-seeker/reports/reports.component';
import { EditProfileComponent } from './modules/job-seeker/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './modules/job-seeker/view-profile/view-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UploadResumeComponent } from './modules/job-seeker/upload-resume/upload-resume.component';
import { UserListPageComponent } from './modules/admin/user-list-page/user-list-page.component';

import { authGuard } from './core/auth/auth.guard';


export const routes: Routes = [
  {path: 'home', component:HomeComponent, title:'Home'},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'login',component:LoginComponent, title:'Login'},
  {path:'forget-password',component:ForgetPasswordComponent, title:'Forget Password'},
  {path:'reset-password',component:ResetPasswordComponent, title:'Reset Password'},
  {path: 'dashboard',component:DashboardComponent,canActivate:[authGuard], title:'Dashboard'},
  {path:'dashboard/post-job', component: PostJobComponent, title:'Post Job'},
  {path: 'dashboard/reports',component:ReportsComponent, title:'Reports'},
  {path:'dashboard/view-profile',component: ViewProfileComponent, title:'View Profile'},
  {path:'edit-profile',component:EditProfileComponent, title:'Edit Profile'},
  { path: 'jobs', component: jobSearchPageComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  {path: 'applications', component: MyApplicationsComponent},
  {path: 'users', component: UserListPageComponent},
  {path:'notifications',component:NotificationsComponent, title:'notifications'},
  {path:'upload-Resume',component:UploadResumeComponent, title:'Upload-Resume'},
  {path:'view-profile',component:ViewProfileComponent, title:'view-profile'},
  {path:'notfound', component:NotfoundComponent, title:'Not Found'},
  {path:'**', redirectTo:'notfound', pathMatch:'full'}
];
