import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})
export class UserListPageComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.error = null;
    this.adminService.getUsers(this.currentPage, this.itemsPerPage).subscribe({
      next: (data: any) => {
        if (data && data.result) {
          this.users = data.result.map((userFromApi: any) => ({
            id: String(userFromApi.id),
            name: `${userFromApi.first_name} ${userFromApi.last_name}`,
            email: userFromApi.email,
            role: this.mapRoleIdToRoleName(userFromApi.role_id),
            createdAt: new Date(userFromApi.created_at),
            avatarUrl: userFromApi.image || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0zscYTnOxutaPDaZ9Un0Ak-y0yR8jw40qA&s`
          }));
          this.totalItems = data.total;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
        this.error = err.message || 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchUsers();
    }
  }

  private mapRoleIdToRoleName(roleId: number): 'admin' | 'employer' | 'jobseeker' {
    switch (roleId) {
      case 1: return 'admin';
      case 2: return 'employer';
      case 3: return 'jobseeker';
      default: return 'jobseeker';
    }
  }
}
