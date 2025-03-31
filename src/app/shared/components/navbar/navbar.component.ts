import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  activeItem: string = 'home'; // Default active item is home

  navItems = [
    { id: 'home', label: 'Home' },
    { id: 'findJob', label: 'Find Job' },
    { id: 'findEmployers', label: 'Find Employers' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'jobAlerts', label: 'Job Alerts' },
    { id: 'customerSupports', label: 'Customer Supports' }
  ];

  setActive(item: string) {
    this.activeItem = item;
  }
}
