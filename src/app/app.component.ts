import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { EditProfileComponent } from './modules/job-seeker/edit-profile/edit-profile.component';
import { UploadResumeComponent } from './modules/job-seeker/upload-resume/upload-resume.component';
import { ViewProfileComponent } from './modules/job-seeker/view-profile/view-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet, NavbarComponent, FooterComponent,EditProfileComponent,UploadResumeComponent,ViewProfileComponent,NotificationsComponent],
=======
  imports: [RouterOutlet, NavbarComponent, FooterComponent,EditProfileComponent,UploadResumeComponent,ViewProfileComponent, NotificationsComponent],
>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Job_Seeker_System_4';
}
