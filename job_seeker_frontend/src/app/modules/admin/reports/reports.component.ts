// Remove the local Report interface if you have one
// Add this import at the top of the file
import { ReportService, Report } from '../../../services/report.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CreateReportDialogComponent } from '../create-report-dialog/create-report-dialog.component';

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
  reports: Report[] = [];
  filteredReports: Report[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private reportService: ReportService // Inject the service
  ) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getReports(this.searchText, this.selectedFilter).subscribe(
      (data) => {
        this.reports = data;
        this.filteredReports = [...this.reports];
      },
      (error) => {
        console.error('Error loading reports:', error);
        this.showNotification('Failed to load reports.');
      }
    );
  }

  filterReports(type: string) {
    this.selectedFilter = type;
    this.loadReports(); // Reload reports based on filter
  }

  applySearch() {
    this.loadReports(); // Reload reports based on search
  }

  searchReports() {
    this.applySearch();
  }

  downloadReport(id: number) {
    this.reportService.downloadReport(id).subscribe(
      (response) => {
        this.showNotification(response.message);
        // Optionally update the downloads count in the frontend if needed
        const report = this.reports.find(r => r.id === id);
        if (report) {
          report.downloads = response.downloads; // Update downloads from backend response
        }
      },
      (error) => {
        console.error('Error downloading report:', error);
        this.showNotification('Failed to download report.');
      }
    );
  }

  shareReport(id: number) {
    this.reportService.shareReport(id).subscribe(
      (response) => {
        this.showNotification(response.message);
      },
      (error) => {
        console.error('Error sharing report:', error);
        this.showNotification('Failed to share report.');
      }
    );
  }

  createNewReport() {
    const dialogRef = this.dialog.open(CreateReportDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reportService.createReport(result).subscribe(
          (newReport) => {
            this.reports.unshift(newReport);
            this.filterReports(this.selectedFilter); // Re-filter to include new report
            this.showNotification('New report created successfully!');
          },
          (error) => {
            console.error('Error creating report:', error);
            this.showNotification('Failed to create report.');
          }
        );
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

  deleteReport(reportId: number) {
    this.reportService.deleteReport(reportId).subscribe(
      () => {
        this.reports = this.reports.filter(report => report.id !== reportId);
        this.filteredReports = this.filteredReports.filter(report => report.id !== reportId);
        this.showNotification('Report deleted successfully!');
      },
      (error) => {
        console.error('Error deleting report:', error);
        this.showNotification('Failed to delete report.');
      }
    );
  }
}
