import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JobListingsComponent {
  searchText: string = '';
  
  
  minSalary: number | null = null;
  maxSalary: number | null = null;
  selectedJobType: string = 'All';
  selectedWorkMode: string = 'All';
  
  jobs = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'ABC Corp',
      jobType: 'Full-time',
      workMode: 'On-site',
      salary: 6000,
      description: 'Developing software applications and tools.'
    },
    {
      id: 2,
      title: 'Marketing Specialist',
      company: 'XYZ Ltd',
      jobType: 'Part-time',
      workMode: 'Remote',
      salary: 4000,
      description: 'Responsible for marketing strategies and campaigns.'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Data Insights',
      jobType: 'Contract',
      workMode: 'Hybrid',
      salary: 5000,
      description: 'Analyzing data and generating reports.'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      jobType: 'Full-time',
      workMode: 'Remote',
      salary: 5500,
      description: 'Design user interfaces and enhance user experience.'
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'Tech Innovators',
      jobType: 'Part-time',
      workMode: 'On-site',
      salary: 4500,
      description: 'Manage product development and market strategies.'
    },
    {
      id: 6,
      title: 'Sales Executive',
      company: 'Sales Group',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      salary: 4000,
      description: 'Responsible for sales and client acquisition.'
    },
    {
      id: 7,
      title: 'Backend Developer',
      company: 'Tech Solutions',
      jobType: 'Contract',
      workMode: 'Remote',
      salary: 6000,
      description: 'Develop and maintain backend systems and services.'
    },
    {
      id: 8,
      title: 'Marketing Manager',
      company: 'Digital Ventures',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      salary: 7000,
      description: 'Develop and execute marketing strategies for products.'
    },
    {
      id: 9,
      title: 'HR Specialist',
      company: 'People First',
      jobType: 'Full-time',
      workMode: 'On-site',
      salary: 4500,
      description: 'Manage HR activities and employee relations.'
    },
    {
      id: 10,
      title: 'Project Manager',
      company: 'Global Projects',
      jobType: 'Part-time',
      workMode: 'Hybrid',
      salary: 4800,
      description: 'Manage and oversee project timelines and execution.'
    }
  ];

 
  get filteredJobs() {
    return this.jobs.filter(job => {
      const matchesSalary = 
        (this.minSalary === null || job.salary >= this.minSalary) && 
        (this.maxSalary === null || job.salary <= this.maxSalary);
        
      const matchesJobType = 
        this.selectedJobType === 'All' || job.jobType === this.selectedJobType;
        
      const matchesWorkMode = 
        this.selectedWorkMode === 'All' || job.workMode === this.selectedWorkMode;
        
      const matchesSearchText = job.title.toLowerCase().includes(this.searchText.toLowerCase());
      
      return matchesSalary && matchesJobType && matchesWorkMode && matchesSearchText;
    });
  }

  addNewJob() {
    alert('Redirecting to add new job page...');
  }

  viewDetails(id: number) {
    alert('Viewing details for job ID: ' + id);
  }

  editJob(id: number) {
    alert('Redirecting to edit job ID: ' + id);
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobs = this.jobs.filter(job => job.id !== id);
    }
  }

  
  applyFilters() {
    console.log('Filters applied:');
    console.log('Min Salary:', this.minSalary);
    console.log('Max Salary:', this.maxSalary);
    console.log('Job Type:', this.selectedJobType);
    console.log('Work Mode:', this.selectedWorkMode);
  }

  
  clearFilters() {
    this.minSalary = null;
    this.maxSalary = null;
    this.selectedJobType = 'All';
    this.selectedWorkMode = 'All';
    this.searchText = '';
  }
}
