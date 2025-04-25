import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { EditProfileComponent } from './modules/job-seeker/edit-profile/edit-profile.component';
import { UploadResumeComponent } from './modules/job-seeker/upload-resume/upload-resume.component';
import { ViewProfileComponent } from './modules/job-seeker/view-profile/view-profile.component';
import { UserDetailsComponent } from './modules/admin/user-details/user-details.component';
import { JobDetailsComponent } from './modules/admin/job-details/job-details.component';
import { JobListingsComponent } from './modules/admin/job-listing/job-listing.component';
import { ApproveRejectEmployersComponent } from './modules/admin/approve-reject-page/approve-reject-page.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent,EditProfileComponent,UploadResumeComponent,ViewProfileComponent,UserDetailsComponent,JobDetailsComponent,JobDetailsComponent,JobListingsComponent,ApproveRejectEmployersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Job_Seeker_System_4';
}
