
import { AuthService } from './../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HostListener, ElementRef } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isDarkMode: boolean = false;
  userImage: string | null = null;
  isSidebarOpen: boolean = false;
  isLoggedIn$: Observable<string | null>;
  navItems = [
    { id: 'home', label: 'Home', authorized: true },
    { id: 'jobs', label: 'Find Job', authorized: true },
    { id: 'dashboard', label: 'Dashboard', authorized: false },
    { id: 'contact', label: 'Customer Supports', authorized: true },
    { id: 'about', label: 'About Us', authorized: true },

  ];
  isLoggedIn() {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('userToken');
    }
    return false;
  }
  constructor(
    public auth: AuthService,
    private router: Router,
    private eRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isLoggedIn$ = this.auth.token$;
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
    }
  }
  notificationCount: number = 0; // Add this property

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Load dark mode preference
      const darkMode = localStorage.getItem('darkMode');
      if (darkMode === 'enabled') {
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
      }

      // Existing token subscription
      this.auth.token$.subscribe(token => {
        if (token) {
          try {
            const userData: any = this.auth.user;
            if (userData) {
              const now = Math.floor(Date.now() / 1000);
              if (userData.exp && userData.exp < now) {
                this.removeToken();
                return;
              }
              this.userImage = userData.image || null;
              this.updateDashboardAccess(true);

              // Update notification count (you can replace this with actual API call)
              this.getNotificationCount();
            }
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
  }

  // Add this method to get notification count
  private getNotificationCount(): void {
    // Replace this with actual API call to get notifications
    // For now, using a mock value
    this.notificationCount = 3;
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
  closeDropdown(event: Event): void {
    event.preventDefault();
    const dropdownMenu = document.querySelector('.dropdown-menu.show');
    if (dropdownMenu) {
      dropdownMenu.classList.remove('show');
    }
  }
  closeMainMenu(): void {
    const navbarCollapse = document.querySelector('.navbar-collapse.show');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }
}
