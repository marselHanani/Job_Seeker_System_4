import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';
import { AuthService } from '../../../../core/auth/auth.service'

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job | undefined;
  loading: boolean = true;
  error: string | null = null;
  submitting: boolean = false;
  coverLetter: string = '';
  resumeFile: File | null = null;
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Get the current authenticated user's ID
    this.userId = this.authService.getCurrentUserId();
    
    // TEMPORARY FIX: Set a default user ID for testing if none exists
    // Remove this in production
    if (!this.userId) {
      console.log('No user ID found, setting temporary ID for testing');
      this.authService.setCurrentUserId('u1');
      this.userId = 'u1';
    }
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // First check if we have jobs in localStorage
      const cachedJobs = localStorage.getItem('jobsData');
      
      if (cachedJobs) {
        // Find the job in localStorage
        const parsedJobs = JSON.parse(cachedJobs);
        const foundJob = parsedJobs.find((job: any) => job.id === id);
        
        if (foundJob) {
          this.job = {
            ...foundJob,
            postedDate: new Date(foundJob.postedDate),
            deadline: new Date(foundJob.deadline)
          };
          this.loading = false;
        } else {
          // If not found in localStorage, fetch from service
          this.fetchJobFromService(id);
        }
      } else {
        // If no localStorage data, fetch from service
        this.fetchJobFromService(id);
      }
    }
  }
  
  fetchJobFromService(id: string): void {
    this.jobService.getJobById(id).subscribe({
      next: (job) => {
        this.job = job;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load job details';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.resumeFile = file;
      console.log('Resume file selected:', file.name);
    }
  }
  
  applyForJob(): void {
    if (!this.job) {
      this.error = 'Job details not available';
      return;
    }
    
    // Check if user is a job seeker
    const userType = this.authService.getUserType();
    if (userType !== 'job-seeker') {
      this.error = 'Only job seekers can apply for jobs. Please log in as a job seeker.';
      return;
    }
    
    // Check if user is authenticated (this should now always pass due to our temporary fix)
    if (!this.userId) {
      this.error = 'You must be logged in to apply for jobs';
      return;
    }
    
    if (!this.resumeFile) {
      this.error = 'Please upload your resume';
      return;
    }
    
    if (!this.coverLetter.trim()) {
      this.error = 'Please provide a cover letter';
      return;
    }
    
    this.submitting = true;
    this.error = null;
    
    // Create form data for the API request
    const formData = new FormData();
    formData.append('job_id', this.job.id);
    formData.append('cover_letter', this.coverLetter);
    formData.append('resume', this.resumeFile);
    
    // Make API call to submit application using the job service
    this.jobService.submitJobApplication(formData, this.userId).subscribe({
      next: (response) => {
        console.log('Application submitted successfully:', response);
        
        // Store application in localStorage for immediate feedback
        const application = {
          id: response.result?.id || new Date().getTime().toString(),
          jobId: this.job!.id,
          userId: this.userId, // Use the real user ID from auth service
          status: 'pending',
          appliedDate: new Date(),
          resume: this.resumeFile?.name || 'resume.pdf',
          coverLetter: this.coverLetter
        };
        
        // Update localStorage applications if they exist
        const storedApplications = localStorage.getItem('userApplications');
        if (storedApplications) {
          const applications = JSON.parse(storedApplications);
          applications.push(application);
          localStorage.setItem('userApplications', JSON.stringify(applications));
        } else {
          localStorage.setItem('userApplications', JSON.stringify([application]));
        }
        
        alert('Your application has been submitted successfully!');
        this.submitting = false;
        this.coverLetter = '';
        this.resumeFile = null;
      },
      error: (error) => {
        console.error('Error submitting application:', error);
        this.error = error.error?.message || 'Failed to submit application. Please try again.';
        this.submitting = false;
      }
    });
  }
}
