import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';  // Add this import

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('visitorChart') chartCanvas!: ElementRef<HTMLCanvasElement>;

  userType: 'job-seeker' | 'employer' | 'admin';
  menuItems: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService  // Add AuthService
  ) {
    this.userType = this.authService.getUserType();  // Use AuthService instead
    this.setMenuItems();
  }

  // Remove getUserType method as we're using AuthService now

  private setMenuItems() {
    // Common Items
    const commonItems = [
      { link: '/dashboard', icon: 'fa-th-large', text: 'Dashboard', active: true },
      { link: '/notifications', icon: 'fa-bell', text: 'Notifications' },
    ];
    
    // Employer Items
    const employerItems = [
      { link: '/dashboard/post-job', icon: 'fa-paper-plane', text: 'Post Job' },
      { link: '/dashboard/manage-jobs', icon: 'fa-tasks', text: 'Manage Jobs' },
      { link: '/dashboard/JobListings', icon: 'fa-solid fa-briefcase', text: 'Job Listings' },
    ];

    // Job Seeker Items
    const jobSeekerItems = [
      { link: '/applications', icon: 'fa-briefcase', text: 'My Applications' },
      { link: '/dashboard/saved-jobs', icon: 'fa-bookmark', text: 'Saved Jobs' },
      { link: '/dashboard/view-profile', icon: 'fa-user', text: 'My Profile' },
      { link: '/jobs', icon: 'fa-search', text: 'Search Jobs' },
    ];

    // Admin Items
    const adminItems = [
      ...commonItems,
      { link: '/dashboard/view-profile', icon: 'fa-user', text: 'My Profile' },
      { link: '/jobs', icon: 'fa-search', text: 'Search Jobs' },
      ...employerItems,
      { link: '/users', icon: 'fa-users-cog', text: 'Manage Users' },
      { link: '/dashboard/reports', icon: 'fa-chart-bar', text: 'Reports' },
      { link: '/manage-employers', icon: 'fa-users-cog', text: 'Manage Employers' },
    ];

    // Set menuItems based on user type
    switch (this.userType) {
      case 'admin':
        this.menuItems = adminItems;
        break;
      case 'employer':
        this.menuItems = [...commonItems, ...employerItems];
        break;
      default:
        this.menuItems = [...commonItems, ...jobSeekerItems];
        break;
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeChart();
      });
    }
  }

  private initializeChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'LAST 6 MONTHS',
              data: [475273, 450000, 480000, 460000, 490000, 470000, 475273],
              borderColor: '#2196f3',
              tension: 0.4,
              fill: false,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4,
              backgroundColor: 'rgba(33, 150, 243, 0.1)'
            },
            {
              label: 'PREVIOUS',
              data: [782396, 770000, 790000, 785000, 780000, 785000, 782396],
              borderColor: '#4caf50',
              tension: 0.4,
              fill: false,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4,
              backgroundColor: 'rgba(76, 175, 80, 0.1)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'nearest',
            axis: 'x'
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear'
            }
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 10,
                padding: 20,
                font: {
                  size: 12
                },
                color: '#666'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleColor: '#333',
              bodyColor: '#666',
              borderColor: '#e0e0e0',
              borderWidth: 1,
              padding: 10,
              boxWidth: 10,
              usePointStyle: true,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              border: {
                display: false
              },
              grid: {
                color: '#f0f0f0'
              },
              ticks: {
                font: {
                  size: 11
                },
                color: '#666',
                callback: function(value) {
                  return value.toLocaleString();
                }
              }
            },
            x: {
              border: {
                display: false
              },
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 11
                },
                color: '#666'
              }
            }
          }
        }
      });
    }
  }

  toggleSidebar() {
      const sidebar = document.querySelector('.sidebar');
      sidebar?.classList.toggle('active');
  }
}
