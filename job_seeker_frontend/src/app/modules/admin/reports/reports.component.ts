import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CreateReportDialogComponent } from '../create-report-dialog/create-report-dialog.component';
interface Report {
  id: number;
  title: string;
  type: string;
  lastUpdated: string;
  views: number;
  downloads: number;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  searchText: string = '';
  selectedFilter: string = 'All Reports';
  filteredReports: Report[] = [];

  reports: Report[] = [
    {
      id: 1,
      title: 'Performance Analysis',
      type: 'Monthly',
      lastUpdated: '2 days ago',
      views: 245,
      downloads: 56,
      icon: 'fa-chart-bar',
      description: 'Monthly performance metrics and KPIs'
    },
    {
      id: 2,
      title: 'Employee Statistics',
      type: 'Quarterly',
      lastUpdated: '1 week ago',
      views: 189,
      downloads: 42,
      icon: 'fa-users',
      description: 'Quarterly employee engagement and statistics'
    },
    {
      id: 3,
      title: 'Annual Review',
      type: 'Annual',
      lastUpdated: '1 month ago',
      views: 567,
      downloads: 123,
      icon: 'fa-chart-line',
      description: 'Annual company performance review'
    }
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.filteredReports = [...this.reports];
  }

  filterReports(type: string) {
    this.selectedFilter = type;
    if (type === 'All Reports') {
      this.filteredReports = this.reports;
    } else {
      this.filteredReports = this.reports.filter(report => report.type === type);
    }
    this.applySearch();
  }

  applySearch() {
    const searchTerm = this.searchText.toLowerCase();
    if (!searchTerm) {
      if (this.selectedFilter === 'All Reports') {
        this.filteredReports = [...this.reports];
      } else {
        this.filteredReports = this.reports.filter(report => report.type === this.selectedFilter);
      }
      return;
    }

    this.filteredReports = this.reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm) ||
                          report.description?.toLowerCase().includes(searchTerm);
      const matchesFilter = this.selectedFilter === 'All Reports' || report.type === this.selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }

  searchReports() {
    this.applySearch();
  }

  downloadReport(id: number) {
    const report = this.reports.find(r => r.id === id);
    if (report) {
      report.downloads++;
      this.showNotification(`Downloading ${report.title}...`);
    }
  }

  shareReport(id: number) {
    const report = this.reports.find(r => r.id === id);
    if (report) {
      this.showNotification(`Sharing ${report.title}...`);
    }
  }

  createNewReport() {
    const dialogRef = this.dialog.open(CreateReportDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newReport: Report = {
          id: this.reports.length + 1,
          title: result.title,
          type: result.type,
          description: result.description,
          lastUpdated: 'Just now',
          views: 0,
          downloads: 0,
          icon: 'fa-file-alt'
        };

        this.reports.unshift(newReport);
        this.filterReports(this.selectedFilter);
        this.showNotification('New report created successfully!');
      }
    });
  }

  private showNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  // Add to your component class
  isSidebarOpen = true;

  toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
          sidebar.classList.toggle('active');
      }
  }

  deleteReport(reportId: number) { // Change the type to number
      // Logic to delete the report
      console.log(`Report with ID ${reportId} deleted`);
      // Update the filteredReports array to remove the deleted report
      this.filteredReports = this.filteredReports.filter(report => report.id !== reportId);
  }
}
