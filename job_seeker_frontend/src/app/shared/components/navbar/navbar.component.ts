
import { AuthService } from './../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HostListener, ElementRef } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userImage: string | null = null;
  isSidebarOpen: boolean = false; // تأكد من أن القيمة الافتراضية هي false

  navItems = [
    { id: 'home', label: 'Home', authorized: true },
    { id: 'jobs', label: 'Find Job', authorized: true },
    { id: 'dashboard', label: 'Dashboard', authorized: false },
    { id: 'job-alerts', label: 'Job Alerts', authorized: true },
    { id: 'contact', label: 'Customer Supports', authorized: true },
    { id: 'about', label: 'About Us', authorized: true },

  ];

  constructor(public auth: AuthService, private router: Router, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.auth.tokenSubject.subscribe(token => {
      if (token) {
        try {
          const userData: any = this.auth.user;
          const now = Math.floor(Date.now() / 1000);
          if (userData.exp && userData.exp < now) {
            this.removeToken();
            return;
          }
          const timeToExpire = (userData.exp - now) * 1000;
          if (timeToExpire > 0) {
            setTimeout(() => {
              this.removeToken();
            }, timeToExpire);
          }
          this.userImage = userData.image || null;
          this.updateDashboardAccess(true);
        } catch (e) {
          this.userImage = null;
          this.updateDashboardAccess(false);
        }
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

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const navbarCollapse = document.querySelector('.navbar-collapse.show');
    if (navbarCollapse && !this.eRef.nativeElement.contains(event.target)) {
      (navbarCollapse as HTMLElement).classList.remove('show');
    }
  }
}
