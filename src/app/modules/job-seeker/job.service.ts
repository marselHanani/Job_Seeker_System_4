
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job, JobApplication } from '../job-seeker/job.model';

@Injectable({
  providedIn: 'root'
})


export class JobService {
  // Add at the top of JobService
private applications: JobApplication[] = [
  {
    id: '1',
    jobId: '1',
    userId: 'u1',
    status: 'pending',
    appliedDate: new Date('2025-04-05'),
    resume: 'resume.pdf',
    coverLetter: 'I am very excited to apply...'
  },
  {
    id: '2',
    jobId: '2',
    userId: 'u1',
    status: 'accepted',
    appliedDate: new Date('2025-04-02'),
    resume: 'resume.pdf',
    coverLetter: 'My background in UX makes me a good fit...'
  },
  {
    id: '3',
    jobId: '4',
    userId: 'u1',
    status: 'rejected',
    appliedDate: new Date('2025-11-02'),
    resume: 'sss.pdf',
    coverLetter: 'My background in UX makes me a good fit...'
  }
];

// Add this method to JobService
getApplicationsByUser(userId: string): Observable<JobApplication[]> {
  const userApps = this.applications.filter(app => app.userId === userId);
  return of(userApps);
}

  private jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'Looking for an experienced software engineer to join our dynamic team. You will be responsible for developing high-quality applications, collaborating with cross-functional teams, and mentoring junior developers.',
      requirements: [
        '5+ years of experience in web development',
        'Strong knowledge of Angular and TypeScript',
        'Experience with Node.js and databases',
        'Excellent problem-solving skills'
      ],
      postedDate: new Date('2025-03-15'),
      deadline: new Date('2025-04-15'),
      category: 'Software Development'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      company: 'Creative Solutions',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$90,000 - $110,000',
      description: 'We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio, excellent design skills, and a passion for creating intuitive interfaces.',
      requirements: [
        '3+ years of experience in UX/UI design',
        'Proficiency in design tools like Figma and Adobe XD',
        'Understanding of user-centered design principles',
        'Strong portfolio demonstrating your skills'
      ],
      postedDate: new Date('2025-03-18'),
      deadline: new Date('2025-04-18'),
      category: 'Design'
    },
    {
      id: '3',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    },
    {
      id: '4',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    },
    {
      id: '5',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    },
    {
      id: '6',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    },
    {
      id: '7',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    },
    {
      id: '8',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    },
    {
      id: '9',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    },
    {
      id: '10',
      title: 'Marketing Specialist',
      company: 'Global Marketing Inc',
      location: 'Chicago, IL',
      type: 'Remote',
      salary: '$70,000 - $85,000',
      description: 'Join our marketing team to help develop and implement marketing strategies across digital channels. You will be responsible for campaign management, content creation, and performance analysis.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '2+ years of experience in digital marketing',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and communication skills'
      ],
      postedDate: new Date('2025-03-20'),
      deadline: new Date('2025-04-20'),
      category: 'Marketing'
    }
  ];

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    // In a real app, this would be an HTTP call
    return of(this.jobs);
  }

  getJobById(id: string): Observable<Job | undefined> {
    // In a real app, this would be an HTTP call
    return of(this.jobs.find(job => job.id === id));
  }

  searchJobs(query: string): Observable<Job[]> {
    // In a real app, this would be an HTTP call
    const lowercaseQuery = query.toLowerCase();
    const filteredJobs = this.jobs.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.location.toLowerCase().includes(lowercaseQuery) ||
      (job.category && job.category.toLowerCase().includes(lowercaseQuery))
    );
    return of(filteredJobs);
  }

  addJob(job: Omit<Job, 'id'>): Observable<Job> {
    // In a real app, this would be an HTTP call
    const newJob: Job = {
      ...job,
      id: (this.jobs.length + 1).toString()
    };
    this.jobs.push(newJob);
    return of(newJob);
  }
}
