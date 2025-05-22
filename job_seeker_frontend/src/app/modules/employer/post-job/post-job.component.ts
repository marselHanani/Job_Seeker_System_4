import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css'],
  imports:[CommonModule, ReactiveFormsModule]
})
export class PostJobComponent {
  postJobForm: FormGroup;

  jobRoles: string[] = ['Software Developer', 'Web Designer', 'Project Manager', 'Data Analyst', 'UI/UX Designer', 'DevOps Engineer', 'Product Manager'];
  salaryTypes: string[] = ['Per Hour', 'Per Day', 'Per Week', 'Per Month', 'Per Year'];
  educationLevels: string[] = ['High School', 'Bachelor Degree', 'Master Degree', 'PhD', 'Diploma', 'Other'];
  experienceLevels: string[] = ['Entry Level', '1-2 Years', '2-5 Years', '5-10 Years', '10+ Years'];
  jobTypes: string[] = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'];
  vacanciesOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  jobLevels: string[] = ['Junior', 'Mid Level', 'Senior', 'Team Lead', 'Manager'];

  constructor(private api:ApiService,private _Router:Router) {
    this.postJobForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      description: new FormControl('', Validators.required),
      salary_minimum: new FormControl('', [Validators.required, Validators.min(0)]),
      salary_maximum: new FormControl('', [Validators.required, Validators.min(0)]),
      location: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      experience: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      requirements: new FormControl('', Validators.required),
      responsibilities: new FormControl('', Validators.required),
      education: new FormControl('', []), // nullable
      vacancies: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      expiration: new FormControl('', Validators.required),
      time_type: new FormControl('', Validators.required),
      job_level: new FormControl('', Validators.required),
      job_type: new FormControl('', Validators.required),
      job_role: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl(''), // nullable
      tags: new FormControl('')
    });
  }

  PostJob(data :FormGroup){
    this.api.postJop(data.value).subscribe({
      next:(res)=>{
        this._Router.navigate(['/jobs'])
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
