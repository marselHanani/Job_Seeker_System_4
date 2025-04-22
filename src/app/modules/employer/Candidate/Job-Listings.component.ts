import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../job-seeker/job.service';
import { Job } from '../../job-seeker/job.model';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgFor, NgIf],

  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.css']
})
export class JobListingsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
      this.filteredJobs = data;
    });
  }

  searchJobs(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
  }

  openAddJobForm(): void {
    this.router.navigate(['/dashboard/post-job']);
  }

  editJob(job: Job): void {
    if (job && job.id) {
      this.router.navigate(['/dashboard/manage-jobs/edit', job.id]);
    } else {
      console.error("Job ID is not valid");
    }
  }

  deleteJob(job: Job): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(job.id).subscribe(() => {
        this.jobs = this.jobs.filter(j => j.id !== job.id);
        this.filteredJobs = this.filteredJobs.filter(j => j.id !== job.id);
      });
    }
  }
}
