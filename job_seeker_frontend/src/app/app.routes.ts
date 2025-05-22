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
import { ReportsComponent } from './modules/admin/reports/reports.component';
import { EditProfileComponent } from './modules/job-seeker/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './modules/job-seeker/view-profile/view-profile.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';
import { UploadResumeComponent } from './modules/job-seeker/upload-resume/upload-resume.component';
import { UserListPageComponent } from './modules/admin/user-list-page/user-list-page.component';

import { authGuard } from './core/auth/auth.guard';
import { AboutComponent } from './modules/public/about/about.component';
import { ContactComponent } from './modules/public/contact/contact.component';
import { JobAlertsComponent } from './modules/job-seeker/job-alerts/job-alerts.component';

import { ManageJobsComponent } from './modules/employer/manage-jobs/manage-jobs.component';
import { SavedJobsComponent } from './modules/job-seeker/saved-jobs/saved-jobs.component';
import { EditJobsComponent } from './modules/employer/manage-jobs/edit/edit-jobs.component';
import { JobListingsComponent } from './modules/admin/job-listing/job-listing.component';
import {JobListingsComponent as job_list} from './modules/employer/Candidate/job-listings.component'
import { ViewCandidates } from './modules/employer/Candidate/ViewCandidate/View-Candidate.component';
import { EmployerManageComponent } from './modules/admin/employer-manage/employer-manage.component';
import { UserDetailsComponent } from './modules/admin/user-details/user-details.component';
import { JobDetailsComponent } from './modules/admin/job-details/job-details.component';
import { ApproveRejectEmployersComponent } from './modules/admin/approve-reject-page/approve-reject-page.component';
import { CreateEmployerComponent } from './modules/admin/create-employer/create-employer.component';
import { AddUserComponent } from './modules/admin/add-user/add-user.component';

export const routes: Routes = [
  {path: 'home', component:HomeComponent, title:'Home'},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'about', component:AboutComponent, title:'About'},
  {path:'contact', component:ContactComponent, title:'Contact'},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'login',component:LoginComponent, title:'Login'},
  {path:'forget-password',component:ForgetPasswordComponent, title:'Forget Password'},
  {path:'reset-password/:id',component:ResetPasswordComponent, title:'Reset Password'},
  {path: 'dashboard',component:DashboardComponent,canActivate:[authGuard], title:'Dashboard'},
  {path:'dashboard/post-job', component: PostJobComponent, title:'Post Job'},
  {path: 'dashboard/reports',component:ReportsComponent, title:'Reports'},
  {path:'dashboard/view-profile',component: ViewProfileComponent, title:'View Profile'},
  {path:'edit-profile',component:EditProfileComponent, title:'Edit Profile'},
  {path: 'jobs', component: jobSearchPageComponent ,title:'Jobs'},
  {path: 'jobs/:id', component: JobDetailComponent, title:'Job Detail' },
  {path:'create-user', component:AddUserComponent, title:'Create User'},
  {path:'manage-employers', component:EmployerManageComponent,title:'Manage Employers'},
  {path: 'applications', component: MyApplicationsComponent},
  {path: 'users', component: UserListPageComponent,title:'Users'},
  {path:'notifications',component:NotificationsComponent, title:'notifications'},
  {path:'upload-Resume',component:UploadResumeComponent, title:'Upload-Resume'},
  {path:'view-profile',component:ViewProfileComponent, title:'view-profile'},
  {path:'job-alerts',component:JobAlertsComponent, title:'job-alert'},
  {path:'dashboard/manage-jobs',component:ManageJobsComponent , title: 'manage job'},
  {path:'dashboard/manage-jobs/status',component:ApproveRejectEmployersComponent , title: 'manage job status'},
  {path:'dashboard/saved-jobs' ,component:SavedJobsComponent , title: 'saved job'},
  {path: 'dashboard/manage-jobs/edit/:id', component: EditJobsComponent, title: 'Edit Job' },
  {path: 'view-candidate/:id' , component: ViewCandidates , title: 'View Candidates'},
  {path: 'dashboard/JobListings' , component: JobListingsComponent , title: 'Job Listings'},
  {path: 'dashboard/job-listings' , component: job_list , title: 'Job Listings'},
  {path:'user/:id', component:UserDetailsComponent,title:'User Details'},
  {path:'job-details', component:JobDetailsComponent, title:'Job Details'},
  {path:'notfound', component:NotfoundComponent, title:'Not Found'},
  {path:'**', redirectTo:'notfound', pathMatch:'full',title:'Not Found'},
];

