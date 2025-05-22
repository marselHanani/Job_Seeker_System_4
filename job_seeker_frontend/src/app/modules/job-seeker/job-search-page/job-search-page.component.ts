import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe, SlicePipe } from '@angular/common';
import { JobService } from '../job.service';
import { Job } from '../job.model';

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
    
    // Check if jobs exist in localStorage
    const cachedJobs = localStorage.getItem('jobsData');
    
    if (cachedJobs) {
      // Use jobs from localStorage
      const parsedJobs = JSON.parse(cachedJobs);
      this.jobs = parsedJobs.map((job: any) => ({
        ...job,
        postedDate: new Date(job.postedDate),
        deadline: new Date(job.deadline),
        saved: false
      }));
      this.filteredJobs = [...this.jobs];
      this.loading = false;
    } else {
      // Fetch from database if not in localStorage
      this.jobService.getJobs().subscribe({
        next: (jobs) => {
          this.jobs = jobs.map(job => ({ ...job, saved: false }));
          this.filteredJobs = [...this.jobs];
          
          // Store in localStorage for future use
          localStorage.setItem('jobsData', JSON.stringify(this.jobs));
          
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load jobs';
          this.loading = false;
        }
      });
    }
  }

  searchJobs(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredJobs = [...this.jobs];
    } else {
      // Search in local storage data instead of making API call
      const query = this.searchQuery.toLowerCase();
      this.filteredJobs = this.jobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        (job.category && job.category.toLowerCase().includes(query))
      );
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
