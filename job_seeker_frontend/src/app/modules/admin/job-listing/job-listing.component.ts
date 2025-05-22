import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe, SlicePipe, CommonModule } from '@angular/common';
import { JobService } from '../../job-seeker/job.service';
import { Job } from '../../job-seeker/job.model';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, NgIf, DatePipe, SlicePipe, CommonModule],
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
})
export class JobListingsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchQuery: string = '';
  searchText: string = '';
  loading: boolean = true;
  error: string | null = null;

  sortOption: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  minSalary: number | null = null;
  maxSalary: number | null = null;
  selectedJobType: string = 'All';
  selectedWorkMode: string = 'All';

  constructor(private jobService: JobService, private _Router: Router) {}

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
    if (this.searchText.trim() === '') {
      this.filteredJobs = [...this.jobs];
    } else {
      // Search in local storage data instead of making API call
      const query = this.searchText.toLowerCase();
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
    if (this.sortOption === '') {
      this.filteredJobs = [...this.jobs];
    } else {
      this.filteredJobs.sort((a: any, b: any) => {
        let aValue: any;
        let bValue: any;
        
        switch (this.sortOption) {
          case 'salary':
            const getMinSalary = (salary: string): number => {
              if (!salary) return 0;
              const match = salary.toString().match(/\$?(\d+[,\d]*)/); // Only match the first number
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
  }

  applyFilters(): void {
    console.log('Filters applied:');
    console.log('Min Salary:', this.minSalary);
    console.log('Max Salary:', this.maxSalary);
    console.log('Job Type:', this.selectedJobType);
    console.log('Work Mode:', this.selectedWorkMode);
    this.filteredJobs = this.jobs.filter(job => {
      // Parse salary as number for comparison
      const salaryString = job.salary?.toString() || '';
      const salaryMatch = salaryString.match(/\$?(\d+[,\d]*)/); // Match first number in string
      const jobSalary = salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, '')) : 0;
      
      const matchesSalary =
        (this.minSalary === null || jobSalary >= this.minSalary) &&
        (this.maxSalary === null || jobSalary <= this.maxSalary);

      const matchesJobType =
        this.selectedJobType === 'All' || job.type === this.selectedJobType;

      const matchesWorkMode =
        this.selectedWorkMode === 'All' || 
        (job.location && job.location.toLowerCase().includes(this.selectedWorkMode.toLowerCase()));

      return matchesSalary && matchesJobType && matchesWorkMode;
    });
  }

  clearFilters(): void {
    this.minSalary = null;
    this.maxSalary = null;
    this.selectedJobType = 'All';
    this.selectedWorkMode = 'All';
    this.searchQuery = '';
    this.searchText = '';
    this.filteredJobs = [...this.jobs];
  }

  addNewJob(): void {
    alert('Redirecting to add new job page...');
  }

  viewDetails(id: string) {
    alert('Viewing details for job ID: ' + id);
    this._Router.navigate(["/job-details", id]);
  }

  editJob(id: string) {
    alert('Redirecting to edit job ID: ' + id);
  }

  deleteJob(id: string) {
    if (confirm('Are you sure you want to delete this job?')) {
      // First remove from local array
      this.jobs = this.jobs.filter(job => job.id !== id);
      this.filteredJobs = this.filteredJobs.filter(job => job.id !== id);
      
      // Update localStorage
      localStorage.setItem('jobsData', JSON.stringify(this.jobs));
      
      // Delete from database
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          console.log('Job deleted successfully from database');
        },
        error: (err) => {
          console.error('Error deleting job from database:', err);
          this.error = 'Failed to delete job from database. The local list has been updated.';
        }
      });
    }
  }
}
