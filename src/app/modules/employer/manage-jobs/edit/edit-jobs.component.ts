import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../job-seeker/job.service';
import { Job } from '../../../job-seeker/job.model';



@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-jobs.component.html',
  styleUrls: ['./edit-jobs.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditJobsComponent implements OnInit {  
  editJobForm: FormGroup;

  jobRoles: string[] = ['Software Developer', 'Web Designer', 'Project Manager', 'Data Analyst', 'UI/UX Designer', 'DevOps Engineer', 'Product Manager'];
  salaryTypes: string[] = ['Per Hour', 'Per Day', 'Per Week', 'Per Month', 'Per Year'];
  educationLevels: string[] = ['High School', 'Bachelor Degree', 'Master Degree', 'PhD', 'Diploma', 'Other'];
  experienceLevels: string[] = ['Entry Level', '1-2 Years', '2-5 Years', '5-10 Years', '10+ Years'];
  jobTypes: string[] = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'];
  vacanciesOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  jobLevels: string[] = ['Junior', 'Mid Level', 'Senior', 'Team Lead', 'Manager'];

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router) {

    this.editJobForm = new FormGroup({
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

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe(job => {
        if (job) {
          this.editJobForm.patchValue({
            jobTitle: job.title,
            jobRole: job.category,
            minSalary: parseInt(job.salary.split('-')[0].replace(/\D/g, '')),
            maxSalary: parseInt(job.salary.split('-')[1].replace(/\D/g, '')),
            salaryType: 'Per Year',
            education: '',
            experience: '',
            jobType: job.type,
            vacancies: 1,
            expirationDate: job.deadline.toISOString().split('T')[0],
            jobLevel: '',
            description: job.description,
            responsibilities: job.requirements.join('\n')
          });
        }
      });
    }
  }


  onSubmit() {
    if (this.editJobForm.valid) {
      const jobId = this.route.snapshot.paramMap.get('id');

      if (jobId) {
        const formValues = this.editJobForm.value;

        this.jobService.getJobById(jobId).subscribe(oldJob => {
          if (oldJob) {
            const updatedJob: Job = {
              id: jobId,
              title: formValues.jobTitle,
              category: formValues.jobRole,
              salary: `$${formValues.minSalary} - $${formValues.maxSalary}`,
              type: formValues.jobType,
              location: oldJob.location,
              company: oldJob.company,
              postedDate: oldJob.postedDate,
              deadline: new Date(formValues.expirationDate),
              description: formValues.description,
              requirements: formValues.responsibilities.split('\n')
            };

            this.jobService.updateJob(jobId, updatedJob).subscribe(updated => {
              if (updated) {
                console.log('Job updated successfully!', updated);
                this.router.navigate(['/jobs']);
              } else {
                console.log('Job not found!');
              }
            });
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }}
