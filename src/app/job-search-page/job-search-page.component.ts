import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe, SlicePipe } from '@angular/common';
import { JobService } from '../modules/job-seeker/job.service';
import { Job } from '../modules/job-seeker/job.model'

@Component({
  selector: 'app-job-Search-Page',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, NgIf, DatePipe, SlicePipe],
  templateUrl: './job-Search-Page.component.html',
  styleUrls: ['./job-Search-Page.component.css']
})
export class jobSearchPageComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.filteredJobs = jobs;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load jobs';
        this.loading = false;
      }
    });
  }

  searchJobs(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredJobs = this.jobs;
      return;
    }

    this.loading = true;
    this.jobService.searchJobs(this.searchQuery).subscribe({
      next: (jobs) => {
        this.filteredJobs = jobs;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to search jobs';
        this.loading = false;
      }
    });
  }
}
