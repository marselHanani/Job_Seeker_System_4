import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports:[CommonModule]
})
export class UserDetailsComponent implements OnInit {
  users = [
    {
      name: 'John Doe',
      jobTitle: 'Software Engineer',
      company: 'XYZ Company',
      email: 'johndoe@example.com',
      phone: '(123) 456-7890',
      location: 'New York, USA',
      salary: 75000,
      startDate: new Date('2020-01-01'),
      lastLogin: new Date('2023-04-20'),
      lastProfileUpdate: new Date('2023-03-15'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'Jane Smith',
      jobTitle: 'Marketing Manager',
      company: 'ABC Corp.',
      email: 'janesmith@example.com',
      phone: '(987) 654-3210',
      location: 'Los Angeles, USA',
      salary: 80000,
      startDate: new Date('2018-03-12'),
      lastLogin: new Date('2023-04-18'),
      lastProfileUpdate: new Date('2023-02-20'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'Mark Johnson',
      jobTitle: 'Product Designer',
      company: 'Tech Designs',
      email: 'markjohnson@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, USA',
      salary: 65000,
      startDate: new Date('2021-07-25'),
      lastLogin: new Date('2023-04-19'),
      lastProfileUpdate: new Date('2023-01-10'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'Emily Carter',
      jobTitle: 'HR Specialist',
      company: 'People First',
      email: 'emilycarter@example.com',
      phone: '(321) 654-0987',
      location: 'Chicago, USA',
      salary: 62000,
      startDate: new Date('2019-11-11'),
      lastLogin: new Date('2023-04-15'),
      lastProfileUpdate: new Date('2023-03-01'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'David Brown',
      jobTitle: 'Data Analyst',
      company: 'Insight Lab',
      email: 'davidbrown@example.com',
      phone: '(222) 333-4444',
      location: 'Austin, USA',
      salary: 70000,
      startDate: new Date('2020-06-22'),
      lastLogin: new Date('2023-04-17'),
      lastProfileUpdate: new Date('2023-02-10'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'Laura Green',
      jobTitle: 'UX Researcher',
      company: 'DesignHub',
      email: 'lauragreen@example.com',
      phone: '(777) 888-9999',
      location: 'Seattle, USA',
      salary: 68000,
      startDate: new Date('2021-04-01'),
      lastLogin: new Date('2023-04-14'),
      lastProfileUpdate: new Date('2023-03-05'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'Michael Lee',
      jobTitle: 'DevOps Engineer',
      company: 'CloudWorks',
      email: 'michaellee@example.com',
      phone: '(111) 222-3333',
      location: 'Denver, USA',
      salary: 82000,
      startDate: new Date('2017-08-30'),
      lastLogin: new Date('2023-04-16'),
      lastProfileUpdate: new Date('2023-01-20'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'Sophia Turner',
      jobTitle: 'QA Engineer',
      company: 'BugCatchers',
      email: 'sophiaturner@example.com',
      phone: '(444) 555-6666',
      location: 'Miami, USA',
      salary: 63000,
      startDate: new Date('2020-02-18'),
      lastLogin: new Date('2023-04-13'),
      lastProfileUpdate: new Date('2023-02-28'),
      showJobInfo: false,
      showActivityLog: false
    },
    {
      name: 'Kevin Harris',
      jobTitle: 'IT Support',
      company: 'HelpDesk Pro',
      email: 'kevinharris@example.com',
      phone: '(999) 000-1111',
      location: 'Dallas, USA',
      salary: 56000,
      startDate: new Date('2019-10-10'),
      lastLogin: new Date('2023-04-11'),
      lastProfileUpdate: new Date('2023-01-15'),
      showJobInfo: false,
      showActivityLog: false
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleJobInfo(user: any) {
    user.showJobInfo = !user.showJobInfo;
  }

  toggleActivityLog(user: any) {
    user.showActivityLog = !user.showActivityLog;
  }

  editProfile(user: any) {
    alert(`Editing profile for ${user.name}`);
  }

  deleteAccount(user: any) {
    alert(`Deleting account for ${user.name}`);
  }
}
