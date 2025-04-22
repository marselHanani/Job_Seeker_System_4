import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  imports: [CommonModule, FormsModule]
})
export class JobDetailsComponent implements OnInit {

  
  job = {
    id: 1,  
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
    publishDate: '2025-04-01',
    deadline: '2025-04-30',
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

  constructor() { }

  ngOnInit(): void { }

  toggleApplicants(): void {
    this.showApplicants = !this.showApplicants;
  }

 
  deleteJob(jobId: number): void {
    console.log('Deleted job with ID:', jobId);
    
  }

  
  editJob(jobId: number): void {
    alert(`Editing job with ID: ${jobId}`);
    
  }

}
