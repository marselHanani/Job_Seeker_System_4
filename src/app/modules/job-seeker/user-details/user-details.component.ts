import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserdetailsComponent {
  profileImage: File | null = null;
  resumes: File[] = [];

  onProfileImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.profileImage = input.files[0];
      console.log('Profile image:', this.profileImage);
    }
  }

  onResumeSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        if (input.files[i].type === 'application/pdf') {
          this.resumes.push(input.files[i]);
        }
      }
      console.log('Uploaded resumes:', this.resumes);
    }
  }
}
