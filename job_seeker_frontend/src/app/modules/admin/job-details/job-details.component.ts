import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../job-seeker/job.service';
import { Job } from '../../job-seeker/job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JobDetailsComponent implements OnInit {

  
  job: Job = {
    id: '1', 
    title: 'Web Developer',
    description: 'A skilled web developer with expertise in Angular and Node.js.',
    company: 'Modern Tech Company',
    location: 'Remote',
    salary: '$5000 - $7000 per month',
    requirements: [
      'Experience in Angular and React',
      'Proficiency with version control systems like Git',
      'Experience with JavaScript and TypeScript programming'
    ],
    postedDate: new Date('2025-04-01'),
    deadline: new Date('2025-04-30'),    
    type: 'Full-time',                    
    applicants: [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        resumeLink: 'https://example.com/resume/alice',
        status: 'Under Review'
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        resumeLink: 'https://example.com/resume/bob',
        status: 'Accepted'
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        resumeLink: 'https://example.com/resume/charlie',
        status: 'Rejected'
      }
    ]
  };

  showApplicants: boolean = false;

  constructor(private jobService: JobService) {}

  ngOnInit(): void { }

  toggleApplicants(): void {
    this.showApplicants = !this.showApplicants;
  }

  deleteJob(jobId: string): void {
    this.jobService.deleteJob(jobId).subscribe({
      next: () => {
        console.log(`✅ Job with ID ${jobId} deleted successfully.`);
       
      },
      error: (err) => {
        console.error('❌ Error deleting job:', err);
      }
    });
  }


  editJob(jobId: string): void {
    const updatedJob: Job = {
      id: jobId,
      title: this.job.title + ' (Edited)', 
      description: this.job.description,
      company: this.job.company,
      location: this.job.location,
      salary: this.job.salary,
      requirements: this.job.requirements,
      postedDate: this.job.postedDate,
      deadline: this.job.deadline,
      type: this.job.type,            
      applicants: this.job.applicants
    };

    this.jobService.updateJob(jobId, updatedJob).subscribe({
      next: (updated) => {
        console.log('✅ Job updated:', updated);
        alert(`Editing job with ID: ${jobId} done successfully.`);
      },
      error: (err) => {
        console.error('❌ Error updating job:', err);
      }
    });
  }
}
