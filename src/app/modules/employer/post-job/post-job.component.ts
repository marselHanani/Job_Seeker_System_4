import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css'],
  imports:[CommonModule, ReactiveFormsModule]
})
export class PostJobComponent {
  postJobForm: FormGroup;

  // Add these properties
  jobRoles: string[] = ['Software Developer', 'Web Designer', 'Project Manager', 'Data Analyst', 'UI/UX Designer', 'DevOps Engineer', 'Product Manager'];

  salaryTypes: string[] = ['Per Hour', 'Per Day', 'Per Week', 'Per Month', 'Per Year'];

  educationLevels: string[] = ['High School', 'Bachelor Degree', 'Master Degree', 'PhD', 'Diploma', 'Other'];

  experienceLevels: string[] = ['Entry Level', '1-2 Years', '2-5 Years', '5-10 Years', '10+ Years'];

  jobTypes: string[] = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'];

  vacanciesOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  jobLevels: string[] = ['Junior', 'Mid Level', 'Senior', 'Team Lead', 'Manager'];

  constructor() {
    this.postJobForm = new FormGroup({
      jobTitle: new FormControl('', Validators.required),
      tags: new FormControl(''),
      jobRole: new FormControl('', Validators.required),
      minSalary: new FormControl('', [Validators.required, Validators.min(0)]),
      maxSalary: new FormControl('', [Validators.required, Validators.min(0)]),
      salaryType: new FormControl('', Validators.required),
      education: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      jobType: new FormControl('', Validators.required),
      vacancies: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      jobLevel: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      responsibilities: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.postJobForm.valid) {
      console.log('Form Submitted', this.postJobForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
