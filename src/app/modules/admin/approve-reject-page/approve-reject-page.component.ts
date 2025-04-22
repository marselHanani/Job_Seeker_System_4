
import { Component,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approve-reject-employers',
  templateUrl: './approve-reject-page.component.html',
  styleUrls: ['./approve-reject-page.component.css'],
  imports:[CommonModule,FormsModule]
})
export class ApproveRejectEmployersComponent {
  // data
  employers = [
    {
      name: 'John Doe',
      email: 'john@company.com',
      phone: '+972-598123456',
      companyName: 'Tech Solutions',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://techsolutions.com',
      status: 'Pending',
      createdAt: new Date('2025-04-15')
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@webdev.com',
      phone: '+972-599987654',
      companyName: 'Web Dev Co',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://webdevco.com',
      status: 'Pending',
      createdAt: new Date('2025-04-17')
    },
    {
      name: 'Michael Johnson',
      email: 'michael@techhub.com',
      phone: '+972-598765432',
      companyName: 'Tech Hub',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://techhub.com',
      status: 'Approved',
      createdAt: new Date('2025-04-14')
    },
    {
      name: 'Emma White',
      email: 'emma@designpro.com',
      phone: '+972-599876543',
      companyName: 'Design Pro',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://designpro.com',
      status: 'Rejected',
      createdAt: new Date('2025-04-16')
    },
    {
      name: 'James Brown',
      email: 'james@digitalworld.com',
      phone: '+972-598654321',
      companyName: 'Digital World',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://digitalworld.com',
      status: 'Pending',
      createdAt: new Date('2025-04-12')
    },
    {
      name: 'Olivia Green',
      email: 'olivia@marketinggroup.com',
      phone: '+972-599543210',
      companyName: 'Marketing Group',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://marketinggroup.com',
      status: 'Approved',
      createdAt: new Date('2025-04-10')
    },
    {
      name: 'Liam Miller',
      email: 'liam@softworks.com',
      phone: '+972-598432109',
      companyName: 'SoftWorks',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://softworks.com',
      status: 'Rejected',
      createdAt: new Date('2025-04-18')
    },
    {
      name: 'Sophia Davis',
      email: 'sophia@websolutions.com',
      phone: '+972-599321098',
      companyName: 'Web Solutions',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://websolutions.com',
      status: 'Pending',
      createdAt: new Date('2025-04-13')
    },
    {
      name: 'Ethan Wilson',
      email: 'ethan@cloudtech.com',
      phone: '+972-598987654',
      companyName: 'CloudTech',
      logoUrl: 'https://via.placeholder.com/60x60.png?text=Logo',
      website: 'https://cloudtech.com',
      status: 'Approved',
      createdAt: new Date('2025-04-19')
    }
  ];
  
  // search
  searchQuery: string = '';
  statusFilter: string = '';
  dateFilter: string | null = null;
  
  //clearFilters
  clearFilters() {
    this.searchQuery = '';
    this.statusFilter = '';
    this.dateFilter = null;
  }

 // Filter and display data based on filters
  filteredEmployers() {
    return this.employers.filter(employer => {
      const searchMatch =
        employer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employer.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employer.companyName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const statusMatch = this.statusFilter ? employer.status === this.statusFilter : true;

      const dateMatch = this.dateFilter
        ? new Date(employer.createdAt).toDateString() === new Date(this.dateFilter).toDateString()
        : true;

      return searchMatch && statusMatch && dateMatch;
    });
  }

  // Approve employer
  approve(employer: any) {
    employer.status = 'Approved';
  }

  //Reject employer
  reject(employer: any) {
    employer.status = 'Rejected';
  }
}