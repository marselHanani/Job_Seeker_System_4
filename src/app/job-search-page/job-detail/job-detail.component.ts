import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../modules/job-seeker/job.service';
import { Job } from '../../modules/job-seeker/job.model'

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job | undefined;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobService.getJobById(id).subscribe({
        next: (job) => {
          this.job = job;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load job details';
          this.loading = false;
        }
      });
    }
  }

  applyForJob(): void {
    console.log('Applying for job:', this.job?.title);
    alert('Your application has been submitted successfully!');
  }
}
