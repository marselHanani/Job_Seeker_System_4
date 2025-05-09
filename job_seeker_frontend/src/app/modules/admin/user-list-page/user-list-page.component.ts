import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})
//fake data for now/
export class UserListPageComponent {
  users: User[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'admin',
      createdAt: new Date('2023-04-01'),
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'employer',
      createdAt: new Date('2023-06-10'),
      avatarUrl: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'jobseeker',
      createdAt: new Date('2023-07-15'),
      avatarUrl: 'https://i.pravatar.cc/150?img=3'
    }
  ];
}
