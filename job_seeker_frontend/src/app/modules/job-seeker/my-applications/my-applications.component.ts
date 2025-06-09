import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../job.service';
import { Job, JobApplication } from '../job.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe, RouterModule],
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];
  jobs: Job[] = [];
  loading = true;
  error: string | null = null;
  userId = '';

  constructor(private jobService: JobService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    
    // Check if user is a job seeker
    const userType = this.authService.getUserType();
    if (userType !== 'job-seeker') {
      this.error = 'Only job seekers can view their applications';
      this.loading = false;
      return;
    }
    
    // Get the current authenticated user's ID
    this.userId = this.authService.getCurrentUserId();
    
    // TEMPORARY FIX: Set a default user ID for testing if none exists
    // Remove this in production
    if (!this.userId) {
      console.log('No user ID found, setting temporary ID for testing');
      this.authService.setCurrentUserId('u1');
      this.userId = 'u1';
    }
    
    // Load jobs first
    this.jobService.getJobs().subscribe({
      next: jobs => {
        this.jobs = jobs;
        
        // Try to get applications from API
        this.jobService.getApplicationsByUser(this.userId).subscribe({
          next: (apiApps) => {
            // Check if we have any applications in localStorage (for newly submitted applications)
            const storedApplications = localStorage.getItem('userApplications');
            if (storedApplications) {
              const localApps = JSON.parse(storedApplications);
              
              // Merge API applications with localStorage applications
              // Avoid duplicates by checking IDs
              const apiAppIds = new Set(apiApps.map(app => app.id));
              // Only include applications for the current user
              const uniqueLocalApps = localApps.filter((app: JobApplication) => 
                !apiAppIds.has(app.id) && app.userId === this.userId
              );
              
              this.applications = [...apiApps, ...uniqueLocalApps];
            } else {
              this.applications = apiApps;
            }
            
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading applications from API:', err);
            
            // Fallback to localStorage if API fails
            const storedApplications = localStorage.getItem('userApplications');
            if (storedApplications) {
              const localApps = JSON.parse(storedApplications);
              // Only include applications for the current user
              this.applications = localApps.filter((app: JobApplication) => app.userId === this.userId);
            }
            
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.error = 'Failed to load jobs';
        this.loading = false;
      }
    });
  }

  getJobById(id: string): Job | undefined {
    return this.jobs.find(job => job.id === id);
  }
}
