
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Job, JobApplication } from '../job-seeker/job.model';

@Injectable({
  providedIn: 'root'
})


export class JobService {
// Get applications by user from the API
getApplicationsByUser(userId: string): Observable<JobApplication[]> {
  // First try to get from API
  return this.http.get<any>(`/api/applications?user_id=${userId}`).pipe(
    map(response => {
      if (response && response.result) {
        // Map backend application format to our JobApplication model
        const applications = response.result.map((app: any) => ({
          id: app.id.toString(),
          jobId: app.job_id.toString(),
          userId: app.user_id.toString(),
          status: app.status,
          appliedDate: new Date(app.applied_date),
          resume: app.resume,
          coverLetter: app.cover_letter
        }));
        
        // Double-check to ensure we only return applications for this user
        // This is an extra security measure in case the API doesn't filter correctly
        return applications.filter((app: JobApplication) => app.userId === userId);
      }
      return [];
    }),
    catchError(error => {
      console.error('Error fetching applications from API:', error);
      
      // Fallback to localStorage if API fails
      const storedApplications = localStorage.getItem('userApplications');
      if (storedApplications) {
        const applications = JSON.parse(storedApplications);
        // Strictly filter applications by user ID
        return of(applications.filter((app: any) => app.userId === userId));
      }
      
      return of([]);
    })
  );
}

private jobs: Job[] = [
  {
    id: '1',
    title: 'Backend Engineer',
    company: 'Bytewave Solutions',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $135,000',
    description: 'Build and maintain scalable APIs and microservices. Collaborate with frontend and DevOps teams in an agile environment.',
    requirements: [
      '4+ years in backend development',
      'Strong experience with Node.js and PostgreSQL',
      'Familiar with Docker and CI/CD pipelines',
      'Excellent problem-solving skills'
    ],
    postedDate: new Date('2025-03-20'),
    deadline: new Date('2025-04-18'),
    category: 'Software Development'
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    company: 'Bytewave Solutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$175,000 - $125,000',
    description: 'Implement and manage CI/CD pipelines, automate infrastructure, and ensure high availability of services.',
    requirements: [
      '3+ years of experience in DevOps',
      'Proficiency with AWS, Docker, and Kubernetes',
      'Experience with monitoring and logging tools',
      'Strong scripting skills (Bash, Python)'
    ],
    postedDate: new Date('2025-03-22'),
    deadline: new Date('2025-04-25'),
    category: 'DevOps'
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Bytewave Solutions',
    location: 'Seattle, WA',
    type: 'Hybrid',
    salary: '$95,000 - $115,000',
    description: 'Develop and enhance user-facing features with a strong focus on performance and usability.',
    requirements: [
      '3+ years in frontend development',
      'Proficient in Angular or React',
      'Experience with responsive and mobile-first design',
      'Solid knowledge of HTML, CSS, JavaScript/TypeScript'
    ],
    postedDate: new Date('2025-03-18'),
    deadline: new Date('2025-04-20'),
    category: 'Software Development'
  },
  {
    id: '4',
    title: 'Digital Marketing Manager',
    company: 'NovaReach Media',
    location: 'Remote',
    type: 'Full-time',
    salary: '$85,000 - $95,000',
    description: 'Drive online marketing campaigns, oversee content strategy, and analyze performance metrics.',
    requirements: [
      '3+ years in digital marketing',
      'Expertise in Google Ads, SEO, and analytics',
      'Strong content writing and planning skills',
      'Experience with marketing automation tools'
    ],
    postedDate: new Date('2025-03-21'),
    deadline: new Date('2025-04-22'),
    category: 'Marketing'
  },
  {
    id: '5',
    title: 'Content Strategist',
    company: 'NovaReach Media',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$70,000 - $80,000',
    description: 'Craft compelling content strategies to drive user engagement across web and social channels.',
    requirements: [
      'Bachelor\'s in Marketing, Communications, or related field',
      '2+ years in content strategy or copywriting',
      'SEO knowledge and keyword research skills',
      'Excellent storytelling ability'
    ],
    postedDate: new Date('2025-03-24'),
    deadline: new Date('2025-04-26'),
    category: 'Marketing'
  },
  {
    id: '6',
    title: 'PPC Specialist',
    company: 'NovaReach Media',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$75,000 - $90,000',
    description: 'Manage pay-per-click campaigns, perform A/B testing, and optimize for conversion.',
    requirements: [
      '2+ years managing Google Ads and Bing campaigns',
      'Strong knowledge of SEM tools',
      'Analytical mindset with ROI-focused approach',
      'Familiar with landing page optimization'
    ],
    postedDate: new Date('2025-03-26'),
    deadline: new Date('2025-04-23'),
    category: 'Marketing'
  },
  {
    id: '7',
    title: 'UI/UX Designer',
    company: 'Creatix Studios',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$60,000 - 65,000',
    description: 'Design wireframes, mockups, and prototypes with a focus on intuitive and elegant user experiences.',
    requirements: [
      '2+ years in UI/UX design',
      'Proficiency in Figma or Adobe XD',
      'Strong portfolio of user-focused designs',
      'Familiarity with accessibility standards'
    ],
    postedDate: new Date('2025-03-19'),
    deadline: new Date('2025-04-27'),
    category: 'Design'
  },
  {
    id: '8',
    title: 'Product Designer',
    company: 'Creatix Studios',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90,000 - $110,000',
    description: 'Collaborate with product and engineering teams to deliver innovative and elegant design solutions.',
    requirements: [
      '3+ years in product design',
      'Experience working on SaaS platforms',
      'Ability to conduct usability testing',
      'Strong visual and interaction design skills'
    ],
    postedDate: new Date('2025-03-29'),
    deadline: new Date('2025-04-24'),
    category: 'Design'
  },
  {
    id: '9',
    title: 'Motion Graphic Designer',
    company: 'Creatix Studios',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: '$45,000 - $60,000',
    description: 'Create animations and videos for digital campaigns, social media, and product demos.',
    requirements: [
      '2+ years in motion design',
      'Proficiency in After Effects, Premiere Pro',
      'Creative eye for animation and timing',
      'Experience in storytelling through video'
    ],
    postedDate: new Date('2025-03-23'),
    deadline: new Date('2025-04-28'),
    category: 'Design'
  },
  {
    id: '10',
    title: 'Brand Designer',
    company: 'Creatix Studios',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80,000 - $95,000',
    description: 'Develop and maintain brand visuals, including logos, typography, and brand guidelines.',
    requirements: [
      'Bachelor’s in Design or related field',
      'Strong graphic design portfolio',
      'Experience with brand identity systems',
      'Attention to detail and creativity'
    ],
    postedDate: new Date('2025-03-28'),
    deadline: new Date('2025-04-29'),
    category: 'Design'
  }
];

// all of these would work when there is a real database./.\./.\.
  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    // First try to get from API
    return this.http.get<any>('/api/jobs').pipe(
      map(response => {
        if (response && response.result) {
          // Map backend job format to our Job model
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
          
          // Update local cache
          this.jobs = jobs;
          
          return jobs;
        }
        return this.jobs; // Fallback to local data if API fails
      }),
      catchError(error => {
        console.error('Error fetching jobs from API:', error);
        return of(this.jobs); // Fallback to local data
      })
    );
  }

  getJobById(id: string): Observable<Job | undefined> {
    // First try to get from API
    return this.http.get<any>(`/api/jobs/${id}`).pipe(
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
            category: job.category
          };
        }
        return this.jobs.find(job => job.id === id); // Fallback to local data
      }),
      catchError(error => {
        console.error('Error fetching job details from API:', error);
        return of(this.jobs.find(job => job.id === id)); // Fallback to local data
      })
    );
  }

  searchJobs(query: string): Observable<Job[]> {
    // Try to search via API first
    return this.http.get<any>(`/api/jobs?search=${query}`).pipe(
      map(response => {
        if (response && response.result) {
          // Map backend job format to our Job model
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
        
        // Fallback to local search if API fails or returns empty
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
        // Fallback to local search
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
    // Format job data for backend API
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

    // Send to backend API
    return this.http.post<any>('/api/jobs', jobData).pipe(
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
            category: response.result.category
          };
          
          // Update local cache
          this.jobs.push(newJob);
          
          // Update localStorage
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
        
        // Fallback to local implementation if API fails
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
        // Fallback to local implementation
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
    // Format job data for backend API
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

    // Send to backend API
    return this.http.put<any>(`/api/jobs/${id}`, jobData).pipe(
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
            category: response.result.category
          };
          
          // Update local cache
          const index = this.jobs.findIndex(job => job.id === id);
          if (index !== -1) {
            this.jobs[index] = updatedJobData;
          }
          
          // Update localStorage
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
        
        // Fallback to local implementation if API fails
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
    // Delete from backend API
    return this.http.delete(`/api/jobs/${id}`).pipe(
      map(response => {
        // Update local cache
        this.jobs = this.jobs.filter(job => job.id !== id);
        
        // Update localStorage
        const cachedJobs = localStorage.getItem('jobsData');
        if (cachedJobs) {
          const parsedJobs = JSON.parse(cachedJobs);
          const updatedJobs = parsedJobs.filter((job: any) => job.id !== id);
          localStorage.setItem('jobsData', JSON.stringify(updatedJobs));
        }
        
        return response;
      }),
      catchError(error => {
        console.error('Error deleting job from API:', error);
        // Still update local cache even if API fails
        this.jobs = this.jobs.filter(job => job.id !== id);
        
        // Update localStorage
        const cachedJobs = localStorage.getItem('jobsData');
        if (cachedJobs) {
          const parsedJobs = JSON.parse(cachedJobs);
          const updatedJobs = parsedJobs.filter((job: any) => job.id !== id);
          localStorage.setItem('jobsData', JSON.stringify(updatedJobs));
        }
        
        throw error; // Rethrow to let component handle the error
      })
    );
  }

  // Method to submit a job application to the backend
  submitJobApplication(formData: FormData, userId: string): Observable<any> {
    // For development/testing, we'll simulate a successful API response
    // since we don't have actual authentication set up
    const mockResponse = {
      status: 201,
      result: {
        id: new Date().getTime().toString(),
        job_id: formData.get('job_id')?.toString() || '',
        user_id: userId, // Use the provided user ID
        status: 'pending',
        applied_date: new Date().toISOString(),
        resume: formData.get('resume') ? 'resumes/' + (formData.get('resume') as File).name : '',
        cover_letter: formData.get('cover_letter')?.toString() || ''
      },
      message: 'Application submitted successfully'
    };
    
    // In a real app, we would use this:
    // Add user_id to the form data
    // formData.append('user_id', userId);
    // return this.http.post('/api/applications', formData);
    
    // But for now, simulate a successful API call
    return of(mockResponse).pipe(
      delay(1000) // Simulate network delay
    );
  }
}
