import { Routes } from '@angular/router';
import { HomeComponent } from './modules/public/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { ForgetPasswordComponent } from './modules/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { PostJobComponent } from './modules/employer/post-job/post-job.component';

export const routes: Routes = [
  {path: 'home', component:HomeComponent, title:'Home'},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'login',component:LoginComponent, title:'Login'},
  {path:'forget-password',component:ForgetPasswordComponent, title:'Forget Password'},
  {path:'reset-password',component:ResetPasswordComponent, title:'Reset Password'},
  {path:'post-job', component: PostJobComponent, title:'Post Job'},
  {path:'notfound', component:NotfoundComponent, title:'Not Found'},
  {path:'**', redirectTo:'notfound', pathMatch:'full'}
];
