import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployerService } from '../../../services/employer.service';
import { Employer } from '../../employer/employer.model';

@Component({
  selector: 'app-approve-reject-employers',
  templateUrl: './approve-reject-page.component.html',
  styleUrls: ['./approve-reject-page.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ApproveRejectEmployersComponent implements OnInit {
  employers: Employer[] = [];
  searchQuery: string = '';
  statusFilter: string = '';
  dateFilter: string | null = null;

  constructor(private employerService: EmployerService) {}

  ngOnInit() {
    this.loadEmployers();
  }

  loadEmployers() {
    this.employerService.getEmployers().subscribe({
      next: (data) => {
        this.employers = data;
      },
      error: (err) => {
        console.error('Failed to load employers:', err);
        alert('Error loading employers, please try again later.');
      }
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.statusFilter = '';
    this.dateFilter = null;
  }

  filteredEmployers() {
    const query = this.searchQuery.toLowerCase();
    return this.employers.filter(employer => {
      const searchMatch =
        employer.name.toLowerCase().includes(query) ||
        employer.email.toLowerCase().includes(query) ||
        employer.companyName.toLowerCase().includes(query);

      const statusMatch = this.statusFilter ? employer.status === this.statusFilter : true;

      const dateMatch = this.dateFilter
        ? new Date(employer.createdAt).toDateString() === new Date(this.dateFilter).toDateString()
        : true;

      return searchMatch && statusMatch && dateMatch;
    });
  }

  approve(employer: Employer) {
    if (!employer.id) {
      console.error('Employer ID is missing!');
      alert('Cannot update status because employer ID is missing.');
      return;
    }
    this.employerService.updateEmployerStatus(employer.id, 'Approved').subscribe({
      next: (updatedEmployer) => {
        employer.status = updatedEmployer.status;
      },
      error: (err) => {
        console.error('Failed to approve employer:', err);
        alert('Error approving employer, please try again.');
      }
    });
  }

  reject(employer: Employer) {
    if (!employer.id) {
      console.error('Employer ID is missing!');
      alert('Cannot update status because employer ID is missing.');
      return;
    }
    this.employerService.updateEmployerStatus(employer.id, 'Rejected').subscribe({
      next: (updatedEmployer) => {
        employer.status = updatedEmployer.status;
      },
      error: (err) => {
        console.error('Failed to reject employer:', err);
        alert('Error rejecting employer, please try again.');
      }
    });
  }
}
