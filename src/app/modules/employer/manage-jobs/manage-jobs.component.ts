
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe, SlicePipe } from '@angular/common';
import { JobService } from '../../job-seeker/job.service';
import { Job } from '../../job-seeker/job.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-job-Search-Page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgFor, NgIf],
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent  implements OnInit {
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
            const match = salary.match(/\$?([\d,]+)/);
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

  toggleUnSave(job: Job): void {
    job.saved = false;
  }

}