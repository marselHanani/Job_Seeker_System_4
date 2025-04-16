import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, } from '@angular/common';


@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,NgIf]
})
export class JobListingComponent {
  searchQuery = '';
  selectedTypes: string[] = [];
  selectedModes: string[] = [];
  selectedFunctions: string[] = [];
  minSalary: number | null = null;
  maxSalary: number | null = null;
  expandedCardIndex: number | null = null;

  jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract'];
  workModes = ['On-site', 'Remote', 'Hybrid'];
  jobFunctions = ['Marketing', 'Engineering', 'Design', 'Sales', 'Customer Service'];

  jobs = [
    {
      title: 'UI/UX Designer',
      type: 'Full-time',
      salary: 3000,
      company: 'TechCorp',
      companyLogo: 'assets/techcorp-logo.png',
      location: 'New York, USA',
      datePosted: '2025-04-10',
      workMode: 'On-site',
      function: 'Design',
      description: 'Design and improve user interfaces and experiences for our web platform.'
    },
    {
      title: 'Backend Developer',
      type: 'Part-time',
      salary: 2000,
      company: 'CodeBase',
      companyLogo: 'assets/codebase-logo.png',
      location: 'Remote',
      datePosted: '2025-04-11',
      workMode: 'Remote',
      function: 'Engineering',
      description: 'Maintain and develop server-side logic, database integration, and APIs.'
    },
    {
      title: 'Full-stack Developer',
      type: 'Full-time',
      salary: 5000,
      company: 'DevWorks',
      companyLogo: 'assets/devworks-logo.png',
      location: 'San Francisco, USA',
      datePosted: '2025-04-12',
      workMode: 'Hybrid',
      function: 'Engineering',
      description: 'Develop both client and server-side applications and ensure seamless integration.'
    },
    {
      title: 'Marketing Specialist',
      type: 'Part-time',
      salary: 2500,
      company: 'MarketPro',
      companyLogo: 'assets/marketpro-logo.png',
      location: 'London, UK',
      datePosted: '2025-04-15',
      workMode: 'On-site',
      function: 'Marketing',
      description: 'Plan and execute marketing campaigns to increase brand awareness.'
    },
    {
      title: 'Data Scientist',
      type: 'Full-time',
      salary: 6000,
      company: 'DataMinds',
      companyLogo: 'assets/dataminds-logo.png',
      location: 'Toronto, Canada',
      datePosted: '2025-04-14',
      workMode: 'Remote',
      function: 'Engineering',
      description: 'Analyze and interpret complex data to help businesses make data-driven decisions.'
    },
    {
      title: 'Sales Manager',
      type: 'Full-time',
      salary: 4000,
      company: 'SalesForce',
      companyLogo: 'assets/salesforce-logo.png',
      location: 'Berlin, Germany',
      datePosted: '2025-04-13',
      workMode: 'Hybrid',
      function: 'Sales',
      description: 'Lead the sales team and implement strategies to drive business growth.'
    }
  ];
  

  get filteredJobs() {
    return this.jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesType = this.selectedTypes.length === 0 || this.selectedTypes.includes(job.type);
      const matchesMode = this.selectedModes.length === 0 || this.selectedModes.includes(job.workMode);
      const matchesFunction = this.selectedFunctions.length === 0 || this.selectedFunctions.includes(job.function);
      const matchesSalary = (!this.minSalary || job.salary >= this.minSalary) &&
                            (!this.maxSalary || job.salary <= this.maxSalary);

      return matchesSearch && matchesType && matchesMode && matchesFunction && matchesSalary;
    });
  }

  toggleSelection(list: string[], value: string) {
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
  }

  toggleExpand(index: number) {
    this.expandedCardIndex = this.expandedCardIndex === index ? null : index;
  }
}
