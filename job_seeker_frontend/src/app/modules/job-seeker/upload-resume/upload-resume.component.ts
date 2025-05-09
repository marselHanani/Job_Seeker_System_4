import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-resume',
  imports: [CommonModule],
  templateUrl: './upload-resume.component.html',
  styleUrl: './upload-resume.component.css'
})

export class UploadResumeComponent {
  selectedFileName: string = '';
  uploadProgress: number = 0;

  browseFile(): void {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;

      // Optional: You can also start a fake upload progress for demo
      this.simulateUploadProgress();
    }
  }

  simulateUploadProgress(): void {
    this.uploadProgress = 0;
    const interval = setInterval(() => {
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
      } else {
        this.uploadProgress += 10;
      }
    }, 200);
  }
}
