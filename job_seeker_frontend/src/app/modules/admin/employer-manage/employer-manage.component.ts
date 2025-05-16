import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEmployerComponent } from "../create-employer/create-employer.component";

@Component({
  selector: 'app-employer-manage',
  templateUrl: './employer-manage.component.html',
  styleUrls: ['./employer-manage.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, CreateEmployerComponent]
})
export class EmployerManageComponent implements OnInit {
  private modalService = inject(NgbModal);

  searchTerm: string = '';
  statusFilter: string = '';
  industryFilter: string = '';
  sortBy: string = 'newest';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalEmployers: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  startIndex: number = 0;
  endIndex: number = 0;

  employerModal: NgbModalRef | null = null;
  isEditing: boolean = false;
  employerForm: FormGroup;

  employers: any[] = [];
  filteredEmployers: any[] = [];

  constructor(private fb: FormBuilder) {
    this.employerForm = this.fb.group({
      id: [null],
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadEmployers();
  }

  loadEmployers() {
    this.employers = [
      {
        id: 1,
        companyName: 'Tech Corp',
        industry: 'tech',
        contactPerson: 'John Doe',
        email: 'john@techcorp.com',
        status: 'active',
        jobsCount: 5,
        joinedDate: new Date(),
        logo: 'images/team1.jpg'
      },
      // Add more mock data as needed
    ];
    this.filterEmployers();
  }

  filterEmployers() {
    this.filteredEmployers = this.employers.filter(employer => {
      return (
        (this.statusFilter === '' || employer.status === this.statusFilter) &&
        (this.industryFilter === '' || employer.industry === this.industryFilter) &&
        (this.searchTerm === '' || employer.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    });
    this.calculatePagination();
  }

  openAddEmployerModal(content: any) {
    this.isEditing = false;
    this.employerForm.reset();
    this.employerModal = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static'
    });
  }

  openCreateEmployerModal(content: any) {
    this.isEditing = false;
    this.employerForm.reset();
    this.employerModal = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static'
    });
  }

  editEmployer(employer: any, content: any) {
    this.isEditing = true;
    this.employerForm.patchValue(employer);
    this.employerModal = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static'
    });
  }

  saveEmployer() {
    if (this.employerForm.valid) {
      const employerData = this.employerForm.value;
      if (this.isEditing) {
        // Update existing employer
        const index = this.employers.findIndex(e => e.id === employerData.id);
        if (index !== -1) {
          this.employers[index] = employerData;
        }
      } else {
        // Add new employer
        employerData.id = this.employers.length + 1; // Simple ID generation
        this.employers.push(employerData);
      }
      this.filterEmployers();
      this.employerModal?.close();
    }
  }

  handleEmployerCreated(employerData: any) {
    employerData.id = this.employers.length + 1; // Simple ID generation
    this.employers.push(employerData);
    this.filterEmployers();
    this.employerModal?.close();
    console.log('Employer added:', employerData); // Debugging log
  }

  deleteEmployer(employer: any) {
    if (confirm('Are you sure you want to delete this employer?')) {
      this.employers = this.employers.filter(e => e.id !== employer.id);
      this.filterEmployers();
    }
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.industryFilter = '';
    this.sortBy = 'newest';
    this.filterEmployers();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
    }
  }

  calculatePagination() {
    this.totalEmployers = this.filteredEmployers.length;
    this.totalPages = Math.ceil(this.totalEmployers / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalEmployers);
  }

  viewEmployer(employer: any) {
    console.log('Viewing employer:', employer);
  }
}
