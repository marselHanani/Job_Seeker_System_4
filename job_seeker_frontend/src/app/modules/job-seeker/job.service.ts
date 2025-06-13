
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Job, JobApplication } from '../job-seeker/job.model';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  token: string | null;
  decodedToken: any;

  constructor(

    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('userToken');
      if (this.token) {
        try {
          this.decodedToken = jwtDecode(this.token);
        } catch (e) {
          console.error('Invalid token', e);
          this.decodedToken = null;
        }
      }
    } else {
      this.token = null;
      this.decodedToken = null;
    }
  }
getApplicationsByUser(userId: string): Observable<JobApplication[]> {
  userId = this.decodedToken.user_id;
  return this.http.get<any>(`http://localhost:8000/api/applications?user_id=${userId}`).pipe(
    map(response => {
      if (response && response.result) {
        return response.result.map((app: any) => ({
          id: app.id.toString(),
          jobId: app.job_id.toString(),
          userId: this.decodedToken.user_id,
          status: app.status,
          appliedDate: new Date(app.applied_date),
          resume: app.resume,
          coverLetter: app.cover_letter
        }));
      }
      return [];
    }),
    catchError(error => {
      console.error('Error fetching applications from API:', error);
      return of([]);
    })
  );
}

private jobs: Job[] = [];

  getJobs(skip: number = 0, limit: number = 10): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/jobs?skip=${skip}&limit=${limit}`).pipe(
      map(response => {
        if (response && response.result) {
          const jobs = response.result.map((job: any) => ({
            id: job.id.toString(),
            title: job.title,
            company: job.company_name || 'Unknown Company',
            location: job.location,
            description: job.description,
            requirements: job.requirements ? job.requirements.split('\n') : [],
            salary: job.salary,
            type: job.job_type,
            postedDate: new Date(job.created_at),
            deadline: new Date(job.deadline),
            category: job.category
          }));

          return {
            jobs,
            total: response.total,
            hasMore: response.hasMore,
            currentSkip: response.current_skip,
            nextSkip: response.next_skip
          };
        }
        return { jobs: [], total: 0, hasMore: false, currentSkip: 0, nextSkip: 0 };
      }),
      catchError(error => {
        console.error('Error fetching jobs:', error);
        return of({ jobs: [], total: 0, hasMore: false, currentSkip: 0, nextSkip: 0 });
      })
    );
  }

  getJobById(id: string): Observable<Job | undefined> {
    return this.http.get<any>(`http://localhost:8000/api/jobs/${id}`).pipe(
      map(response => {
        if (response && response.result) {
          const job = response.result;
          return {
            id: job.id.toString(),
            title: job.title,
            company: job.company_name || 'Unknown Company',
            location: job.location,
            description: job.description,
            requirements: job.requirements ? job.requirements.split('\n') : [],
            salary: job.salary,
            type: job.job_type,
            postedDate: new Date(job.created_at),
            deadline: new Date(job.deadline),
            category: job.category,
            applicants: job.applicants || []
          };
        }
        return this.jobs.find(job => job.id === id); 
      }),
      catchError(error => {
        console.error('Error fetching job details from API:', error);
        return of(this.jobs.find(job => job.id === id)); 
      })
    );
  }

  searchJobs(query: string): Observable<Job[]> {
    return this.http.get<any>(`http://localhost:8000/api/jobs?search=${query}`).pipe(
      map(response => {
        if (response && response.result) {
          return response.result.map((job: any) => ({
            id: job.id.toString(),
            title: job.title,
            company: job.company_name || 'Unknown Company',
            location: job.location,
            description: job.description,
            requirements: job.requirements ? job.requirements.split('\n') : [],
            salary: job.salary,
            type: job.job_type,
            postedDate: new Date(job.created_at),
            deadline: new Date(job.deadline),
            category: job.category
          }));
        }
        const lowercaseQuery = query.toLowerCase();
        return this.jobs.filter(job =>
          job.title.toLowerCase().includes(lowercaseQuery) ||
          job.company.toLowerCase().includes(lowercaseQuery) ||
          job.location.toLowerCase().includes(lowercaseQuery) ||
          (job.category && job.category.toLowerCase().includes(lowercaseQuery))
        );
      }),
      catchError(error => {
        console.error('Error searching jobs from API:', error);
        const lowercaseQuery = query.toLowerCase();
        const filteredJobs = this.jobs.filter(job =>
          job.title.toLowerCase().includes(lowercaseQuery) ||
          job.company.toLowerCase().includes(lowercaseQuery) ||
          job.location.toLowerCase().includes(lowercaseQuery) ||
          (job.category && job.category.toLowerCase().includes(lowercaseQuery))
        );
        return of(filteredJobs);
      })
    );
  }

  addJob(job: Omit<Job, 'id'>): Observable<Job> {
    const jobData = {
      title: job.title,
      company_name: job.company,
      location: job.location,
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements,
      salary: job.salary,
      job_type: job.type,
      deadline: job.deadline instanceof Date ? job.deadline.toISOString().split('T')[0] : job.deadline,
      category: job.category
    };

    return this.http.post<any>('http://localhost:8000/api/jobs', jobData).pipe(
      map(response => {
        if (response && response.result) {
          const newJob: Job = {
            id: response.result.id.toString(),
            title: response.result.title,
            company: response.result.company_name || 'Unknown Company',
            location: response.result.location,
            description: response.result.description,
            requirements: response.result.requirements ? response.result.requirements.split('\n') : [],
            salary: response.result.salary,
            type: response.result.job_type,
            postedDate: new Date(response.result.created_at),
            deadline: new Date(response.result.deadline),
            category: response.result.category,
            applicants: response.result.applicants || []
          };

          this.jobs.push(newJob);
          const cachedJobs = localStorage.getItem('jobsData');
          if (cachedJobs) {
            const parsedJobs = JSON.parse(cachedJobs);
            parsedJobs.push(newJob);
            localStorage.setItem('jobsData', JSON.stringify(parsedJobs));
          } else {
            localStorage.setItem('jobsData', JSON.stringify([newJob]));
          }

          return newJob;
        }

        const localNewJob: Job = {
          ...job as any,
          id: (this.jobs.length + 1).toString(),
          postedDate: new Date()
        };
        this.jobs.push(localNewJob);
        return localNewJob;
      }),
      catchError(error => {
        console.error('Error adding job to API:', error);
        const localNewJob: Job = {
          ...job as any,
          id: (this.jobs.length + 1).toString(),
          postedDate: new Date()
        };
        this.jobs.push(localNewJob);
        return of(localNewJob);
      })
    );
  }

  updateJob(id: string, updatedJob: Job): Observable<Job | undefined> {
    const jobData = {
      title: updatedJob.title,
      company_name: updatedJob.company,
      location: updatedJob.location,
      description: updatedJob.description,
      requirements: Array.isArray(updatedJob.requirements) ? updatedJob.requirements.join('\n') : updatedJob.requirements,
      salary: updatedJob.salary,
      job_type: updatedJob.type,
      deadline: updatedJob.deadline instanceof Date ? updatedJob.deadline.toISOString().split('T')[0] : updatedJob.deadline,
      category: updatedJob.category
    };

    return this.http.put<any>(`http://localhost:8000/api/jobs/${id}`, jobData).pipe(
      map(response => {
        if (response && response.result) {
          const updatedJobData: Job = {
            id: response.result.id.toString(),
            title: response.result.title,
            company: response.result.company_name || 'Unknown Company',
            location: response.result.location,
            description: response.result.description,
            requirements: response.result.requirements ? response.result.requirements.split('\n') : [],
            salary: response.result.salary,
            type: response.result.job_type,
            postedDate: new Date(response.result.created_at),
            deadline: new Date(response.result.deadline),
            category: response.result.category,
            applicants: response.result.applicants || []

          };

          const index = this.jobs.findIndex(job => job.id === id);
          if (index !== -1) {
            this.jobs[index] = updatedJobData;
          }
          const cachedJobs = localStorage.getItem('jobsData');
          if (cachedJobs) {
            const parsedJobs = JSON.parse(cachedJobs);
            const cacheIndex = parsedJobs.findIndex((job: any) => job.id === id);
            if (cacheIndex !== -1) {
              parsedJobs[cacheIndex] = updatedJobData;
              localStorage.setItem('jobsData', JSON.stringify(parsedJobs));
            }
          }

          return updatedJobData;
        }

        const index = this.jobs.findIndex(job => job.id === id);
        if (index !== -1) {
          this.jobs[index] = { ...updatedJob, id };
          return this.jobs[index];
        }
        return undefined;
      }),
      catchError(error => {
        console.error('Error updating job in API:', error);
        // Fallback to local implementation
        const index = this.jobs.findIndex(job => job.id === id);
        if (index !== -1) {
          this.jobs[index] = { ...updatedJob, id };
          return of(this.jobs[index]);
        }
        return of(undefined);
      })
    );
  }

  deleteJob(id: string): Observable<any> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete(`http://localhost:8000/api/jobs/${id}`,{headers}).pipe(
      map(response => {
        this.jobs = this.jobs.filter(job => job.id !== id);
        const cachedJobs = localStorage.getItem('jobsData');
        if (cachedJobs) {
          const parsedJobs = JSON.parse(cachedJobs);
          const updatedJobs = parsedJobs.filter((job: any) => job.id !== id);
          localStorage.setItem('jobsData', JSON.stringify(updatedJobs));
        }

        return response;
      }),
      catchError(error => {
        this.jobs = this.jobs.filter(job => job.id !== id);

        const cachedJobs = localStorage.getItem('jobsData');
        if (cachedJobs) {
          const parsedJobs = JSON.parse(cachedJobs);
          const updatedJobs = parsedJobs.filter((job: any) => job.id !== id);
          localStorage.setItem('jobsData', JSON.stringify(updatedJobs));
        }

        throw error; 
      })
    );
  }

  submitJobApplication(formData: FormData, userId: string): Observable<any> {
    userId = this.decodedToken.user_id;
    formData.append('user_id', userId);
    return this.http.post('http://localhost:8000/api/add-applications', formData);
  }
}
