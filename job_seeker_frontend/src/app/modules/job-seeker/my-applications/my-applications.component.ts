import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../job.service';
import { Job, JobApplication } from '../job.model';

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
  userId = 'u1'; // your test user ID

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: jobs => {
        this.jobs = jobs;
        this.jobService.getApplicationsByUser(this.userId).subscribe({
          next: apps => {
            this.applications = apps;
            this.loading = false;
          },
          error: () => {
            this.error = 'Failed to load applications';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'Failed to load jobs';
        this.loading = false;
      }
    });
  }

  getJobById(id: string): Job | undefined {
    return this.jobs.find(job => job.id === id);
  }
}
