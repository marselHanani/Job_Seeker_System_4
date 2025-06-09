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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.error = null;
    this.adminService.getUsers().subscribe({
      next: (data: any) => {
        console.log('User data received from backend:', data);
        // Check if data is an array
        if (Array.isArray(data)) {
          this.users = data.map((userFromApi: any) => ({
            id: String(userFromApi.id),
            name: `${userFromApi.first_name} ${userFromApi.last_name}`,
            email: userFromApi.email,
            role: this.mapRoleIdToRoleName(userFromApi.role_id),
            createdAt: new Date(userFromApi.created_at),
            avatarUrl: userFromApi.image || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0zscYTnOxutaPDaZ9Un0Ak-y0yR8jw40qA&s`
          }));
        } else if (data && data.data && Array.isArray(data.data)) {
          // Handle case where users are nested under a 'data' key
          this.users = data.data.map((userFromApi: any) => ({
            id: String(userFromApi.id),
            name: `${userFromApi.first_name} ${userFromApi.last_name}`,
            email: userFromApi.email,
            role: this.mapRoleIdToRoleName(userFromApi.role_id),
            createdAt: new Date(userFromApi.created_at),
            avatarUrl: userFromApi.image || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0zscYTnOxutaPDaZ9Un0Ak-y0yR8jw40qA&s`
          }));
        } else if (data && data.result && Array.isArray(data.result)) {
          // Handle case where users are nested under a 'result' key
          this.users = data.result.map((userFromApi: any) => ({
            id: String(userFromApi.id),
            name: `${userFromApi.first_name} ${userFromApi.last_name}`,
            email: userFromApi.email,
            role: this.mapRoleIdToRoleName(userFromApi.role_id),
            createdAt: new Date(userFromApi.created_at),
            avatarUrl: userFromApi.image || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0zscYTnOxutaPDaZ9Un0Ak-y0yR8jw40qA&s`
          }));
        } else {
          console.error('Unexpected data structure:', data);
          this.error = 'Unexpected data format received from server.';
          this.users = [];
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Detailed error fetching users:', err);
        this.error = err.message || 'Failed to load users. Please try again later.';
        this.isLoading = false;
      }
    });
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
