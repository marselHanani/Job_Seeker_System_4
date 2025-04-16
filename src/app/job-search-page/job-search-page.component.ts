import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe, SlicePipe } from '@angular/common';
import { JobService } from '../modules/job-seeker/job.service';
import { Job } from '../modules/job-seeker/job.model';

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

  sortOption: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs.map(job => ({ ...job, saved: false }));
        this.filteredJobs = [...this.jobs];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load jobs';
        this.loading = false;
      }
    });
  }

  searchJobs(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredJobs = [...this.jobs];
    } else {
      this.loading = true;
      this.jobService.searchJobs(this.searchQuery).subscribe({
        next: (jobs) => {
          this.filteredJobs = jobs.map(job => ({
            ...job,
            saved: this.jobs.find(j => j.id === job.id)?.saved || false
          }));
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to search jobs';
          this.loading = false;
        }
      });
    }
    this.sortJobs();
  }

  sortJobs(): void {
    this.filteredJobs.sort((a: any, b: any) => {
      let aValue: any;
      let bValue: any;
  
      switch (this.sortOption) {
        case 'salary':
          const getMinSalary = (salary: string): number => {
            const match = salary.match(/\$?([\d,]+)/); // Only match the first number
            return match ? parseInt(match[1].replace(/,/g, '')) : 0;
          };
          aValue = getMinSalary(a.salary);
          bValue = getMinSalary(b.salary);
          break;
        case 'postedDate':
        case 'deadline':
          aValue = new Date(a[this.sortOption]).getTime();
          bValue = new Date(b[this.sortOption]).getTime();
          break;
        default:
          aValue = a[this.sortOption];
          bValue = b[this.sortOption];
          break;
      }
  
      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
  

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortJobs();
  }

  toggleSave(job: Job): void {
    job.saved = !job.saved;
  }
}
