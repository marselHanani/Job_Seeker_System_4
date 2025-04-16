import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navItems = [
    { id: 'home', label: 'Home' },
    { id: 'findJob', label: 'Find Job' },
    { id: 'findEmployers', label: 'Find Employers' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'jobAlerts', label: 'Job Alerts' },
    { id: 'customerSupports', label: 'Customer Supports' }
  ];

}

