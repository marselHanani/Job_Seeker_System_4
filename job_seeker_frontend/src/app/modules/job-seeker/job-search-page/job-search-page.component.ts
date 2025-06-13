import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe, SlicePipe } from '@angular/common';
import { JobService } from '../job.service';
import { Job } from '../job.model';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  loading: boolean = false;
  error: string | null = null;

  // Show More properties
  skip: number = 0;
  limit: number = 10;
  hasMore: boolean = true;

  sortOption: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private jobService: JobService,
    private auth: AuthService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    console.log(this.jobService.decodedToken?.id || 'No user ID available');
    this.loadJobs();
  }

  chickRole(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const decode: any = jwtDecode(token);
          if(decode.role==='admin' || decode.role==='employer'){
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error decoding token:', error);
          return false;
        }
      }
    }
    return false;
  }

  loadJobs(): void {
    this.loading = true;
    this.skip = 0; 
    this.jobService.getJobs(this.skip, this.limit).subscribe({
      next: (response) => {
        this.jobs = response.jobs;
        this.filteredJobs = [...this.jobs];
        this.hasMore = response.hasMore;
        this.skip = response.nextSkip || this.limit;
        this.loading = false;
        console.log('Initial load:', {
          jobs: this.jobs.length,
          hasMore: this.hasMore,
          nextSkip: this.skip,
          total: response.total
        });
      },
      error: () => {
        this.error = 'Failed to load jobs';
        this.loading = false;
      }
    });
  }

  loadMoreJobs(): void {
    if (!this.hasMore || this.loading) {
      console.log('Cannot load more:', { hasMore: this.hasMore, loading: this.loading });
      return;
    }

    this.loading = true;
    console.log('Loading more jobs with skip:', this.skip);

    this.jobService.getJobs(this.skip, this.limit).subscribe({
      next: (response) => {
        console.log('Full API Response:', response);
        console.log('Response details:', { 
          jobsReceived: response.jobs.length, 
          hasMore: response.hasMore,
          total: response.total,
          currentSkip: response.currentSkip,
          nextSkip: response.nextSkip,
          loadedCount: response.loaded_count,
          remaining: response.remaining
        });
        if (response.jobs && response.jobs.length > 0) {
          this.jobs = [...this.jobs, ...response.jobs];
          this.filteredJobs = [...this.jobs];
          this.hasMore = response.hasMore;
          this.skip = response.nextSkip || (this.skip + this.limit);
          console.log('Updated frontend state:', { 
            totalJobsLoaded: this.jobs.length, 
            hasMore: this.hasMore, 
            nextSkip: this.skip,
            totalInDB: response.tota,
            shouldHaveMore: this.jobs.length < response.total
          });
        } else {
          this.hasMore = false;
          console.log('No more jobs available - setting hasMore to false');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading more jobs:', error);
        this.error = 'Failed to load more jobs';
        this.loading = false;
      }
    });
  }
  searchJobs(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredJobs = [...this.jobs];
    } else {
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

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
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
  deleteJob(id: string) {
    const warningToast = this.toastr.warning('Are you sure you want to delete this job? if yes tap me ', 'Confirm Delete', {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true,
      tapToDismiss: false,
      positionClass: 'toast-top-center'
    });

    warningToast.onTap.subscribe(() => {
      this.toastr.clear(warningToast.toastId);

      this.jobService.deleteJob(id).subscribe({
        next: () => {
          this.toastr.success('Job deleted successfully!', 'Success', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right'
          });
          this.loadJobs();
        },
        error: () => {
          this.toastr.error('Failed to delete job', 'Error', {
            timeOut: 5000,
            progressBar: true,
            positionClass: 'toast-top-right'
          });
          this.error = 'Failed to delete job';
        }
      });
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
