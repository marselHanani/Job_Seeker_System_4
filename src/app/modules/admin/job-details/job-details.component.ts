import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  imports: [CommonModule],
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobs = [
    {
      companyName: 'Google Inc.',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      location: 'Dhaka, Bangladesh',
      jobType: 'PART-TIME',
      salaryMin: 20000,
      salaryMax: 25000,
      requirements: ['4+ Years Of Experience', 'Proficient In Figma & Adobe XD', 'Experience Working In Agile Teams'],
      skills: ['Figma', 'UX Design', 'Prototyping'],
      fullDescription: 'This is a full job description for the Google job listing. The candidate will work on UX design projects.',
      postedOn: '2025-04-01',
      applicationDeadline: '2025-04-15',
      showDetails: false,
      saved: false // إضافة حالة لحفظ الوظيفة
    },
    {
      companyName: 'Microsoft',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo_2012.svg',
      location: 'Seattle, USA',
      jobType: 'FULL-TIME',
      salaryMin: 60000,
      salaryMax: 80000,
      requirements: ['5+ Years Of Experience', 'Proficient In C#', 'Experience with Cloud Technologies'],
      skills: ['C#', 'Cloud Computing', 'Azure'],
      fullDescription: 'This is a full job description for the Microsoft job listing. The role involves building scalable cloud solutions.',
      postedOn: '2025-03-20',
      applicationDeadline: '2025-04-30',
      showDetails: false,
      saved: false
    },
    {
      companyName: 'Apple',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_%28official%29.svg',
      location: 'Cupertino, USA',
      jobType: 'FULL-TIME',
      salaryMin: 70000,
      salaryMax: 100000,
      requirements: ['3+ Years Of Experience', 'Proficient In Swift', 'Experience with iOS Development'],
      skills: ['Swift', 'iOS Development', 'Xcode'],
      fullDescription: 'Develop and maintain apps for iOS devices. Work with cross-functional teams to deliver high-quality apps.',
      postedOn: '2025-03-15',
      applicationDeadline: '2025-05-01',
      showDetails: false,
      saved: false
    },
    {
      companyName: 'Amazon',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      location: 'Seattle, USA',
      jobType: 'PART-TIME',
      salaryMin: 25000,
      salaryMax: 35000,
      requirements: ['2+ Years Of Experience', 'Knowledge of AWS', 'Familiar with Node.js'],
      skills: ['AWS', 'Node.js', 'JavaScript'],
      fullDescription: 'The job involves building serverless applications using AWS. You will collaborate with the backend team.',
      postedOn: '2025-03-10',
      applicationDeadline: '2025-04-25',
      showDetails: false,
      saved: false
    },
    {
      companyName: 'Facebook',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
      location: 'Menlo Park, USA',
      jobType: 'FULL-TIME',
      salaryMin: 90000,
      salaryMax: 120000,
      requirements: ['3+ Years Of Experience', 'Proficient in React.js'],
      skills: ['React.js', 'JavaScript', 'Web Development'],
      fullDescription: 'Work on building scalable frontend applications with React.js and contribute to the overall architecture.',
      postedOn: '2025-02-28',
      applicationDeadline: '2025-04-20',
      showDetails: false,
      saved: false
    },
    {
      companyName: 'Tesla',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      location: 'Palo Alto, USA',
      jobType: 'FULL-TIME',
      salaryMin: 120000,
      salaryMax: 150000,
      requirements: ['7+ Years Of Experience', 'Expert in Machine Learning', 'Experience with TensorFlow or PyTorch'],
      skills: ['Machine Learning', 'TensorFlow', 'AI Research'],
      fullDescription: 'Join Tesla’s AI team and work on cutting-edge machine learning projects.',
      postedOn: '2025-03-01',
      applicationDeadline: '2025-04-10',
      showDetails: false,
      saved: false
    }
  ];

  currentPage = 1;
  totalPages = 2; // نغير العدد حسب عدد الكروت

  constructor() {}

  ngOnInit(): void {}

  toggleJobDetails(job: any): void {
    job.showDetails = !job.showDetails;
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  editJob(job: any): void {
    console.log('Editing job:', job);
  }

  deleteJob(job: any): void {
    console.log('Deleting job:', job);
  }

  saveJob(job: any): void {
    job.saved = !job.saved;
  }

  getDisplayedJobs() {
    return this.jobs.slice((this.currentPage - 1) * 6, this.currentPage * 6);  // عرض 6 وظائف في الصفحة
  }
}
