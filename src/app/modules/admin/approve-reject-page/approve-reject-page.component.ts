import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approve-reject-page',
  templateUrl: './approve-reject-page.component.html',
  imports: [CommonModule],
  styleUrl: './approve-reject-page.component.css'
})
export class ApproveRejectPageComponent {
  totalApplications = 589;
  registeredUsers = 238;
  activeAlerts = 574;

  allApplicants = [
    {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      jobTitle: 'Frontend Developer',
      company: 'Google',
      status: 'Pending'
    },
    {
      name: 'Ahmed Kareem',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      jobTitle: 'UI/UX Designer',
      company: 'Meta',
      status: 'Pending'
    },
    {
      name: 'Lina Mahmoud',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      jobTitle: 'Backend Developer',
      company: 'Amazon',
      status: 'Pending'
    },
    {
      name: 'David Smith',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      jobTitle: 'DevOps Engineer',
      company: 'Netflix',
      status: 'Pending'
    },
    {
      name: 'Noura Almasri',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      jobTitle: 'QA Engineer',
      company: 'Spotify',
      status: 'Pending'
    },
    {
      name: 'Omar Said',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      jobTitle: 'Mobile Developer',
      company: 'Uber',
      status: 'Pending'
    }
  ];

  applicantsPerPage = 3;
  displayedApplicants = this.allApplicants.slice(0, this.applicantsPerPage);

  showMore() {
    const currentLength = this.displayedApplicants.length;
    const nextSet = this.allApplicants.slice(currentLength, currentLength + this.applicantsPerPage);
    this.displayedApplicants = [...this.displayedApplicants, ...nextSet];
  }

  approveApplicant(applicant: any) {
    applicant.status = 'Approved';
  }

  rejectApplicant(applicant: any) {
    applicant.status = 'Rejected';
  }
}
