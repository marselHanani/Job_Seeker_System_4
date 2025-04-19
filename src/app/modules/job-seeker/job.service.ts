
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job, JobApplication } from '../job-seeker/job.model';

@Injectable({
  providedIn: 'root'
})


export class JobService {
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

getApplicationsByUser(userId: string): Observable<JobApplication[]> {
  const userApps = this.applications.filter(app => app.userId === userId);
  return of(userApps);
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
    return of(this.jobs);
  }

  getJobById(id: string): Observable<Job | undefined> {
    return of(this.jobs.find(job => job.id === id));
  }

  searchJobs(query: string): Observable<Job[]> {
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
    const newJob: Job = {
      ...job,
      id: (this.jobs.length + 1).toString()
    };
    this.jobs.push(newJob);
    return of(newJob);
  }

  updateJob(id: string, updatedJob: Job): Observable<Job | undefined> {
    const index = this.jobs.findIndex(job => job.id === id);
    if (index !== -1) {
      this.jobs[index] = { ...updatedJob, id };
      return of(this.jobs[index]);
    }
    return of(undefined);
  }


}
