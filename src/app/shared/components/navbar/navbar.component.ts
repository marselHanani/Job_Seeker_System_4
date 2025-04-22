import { AuthService } from './../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userImage: string | null = null;

  navItems = [
    { id: 'home', label: 'Home', authorized: true },
    { id: 'jobs', label: 'Find Job', authorized: true },
    { id: 'findEmployers', label: 'Find Employers', authorized: false },
    { id: 'dashboard', label: 'Dashboard', authorized: false },
    { id: 'job-alerts', label: 'Job Alerts', authorized: true },
    { id: 'contact', label: 'Customer Supports', authorized: true },
    { id: 'about', label: 'About Us', authorized: true },

  ];

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.tokenSubject.subscribe(token => {
      if (token) {
        const userData = JSON.parse(token);
        this.userImage = userData.image || null;
        this.updateDashboardAccess(true);
      } else {
        this.userImage = null;
        this.updateDashboardAccess(false);
      }
    });
  }

  private updateDashboardAccess(isAuthorized: boolean): void {
    const dashboardItem = this.navItems.find(item => item.id === 'dashboard');
    if (dashboardItem) {
      dashboardItem.authorized = isAuthorized;
    }

    const employersItem = this.navItems.find(item => item.id === 'findEmployers');
    if (employersItem) {
      employersItem.authorized = isAuthorized;
    }
  }

  removeToken(): void {
    this.auth.token = null;
    localStorage.removeItem('currentUserImage');
    this.router.navigate(['/login']);
  }
}

