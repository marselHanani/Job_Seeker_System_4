import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface JobAlert {
  id: number;
  title: string;
  location: string;
  frequency: string;
  keywords: string[];
  isActive: boolean;
}

@Component({
  selector: 'app-job-alerts',
  templateUrl: './job-alerts.component.html',
  styleUrls: ['./job-alerts.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JobAlertsComponent implements OnInit {
  alerts: JobAlert[] = [];
  frequencies = ['Daily', 'Weekly', 'Monthly'];
  newAlert: JobAlert = {
    id: 0,
    title: '',
    location: '',
    frequency: 'Daily',
    keywords: [],
    isActive: true
  };

  ngOnInit() {
    this.loadAlerts();
  }

  private loadAlerts() {
    const savedAlerts = localStorage.getItem('jobAlerts');
    if (savedAlerts) {
      this.alerts = JSON.parse(savedAlerts);
    } else {
      this.alerts = [
        {
          id: 1,
          title: 'Software Developer',
          location: 'Nablus',
          frequency: 'Daily',
          keywords: ['Angular', 'TypeScript', 'Node.js'],
          isActive: true
        },
        {
          id: 2,
          title: 'Frontend Developer',
          location: 'Gaza',
          frequency: 'Weekly',
          keywords: ['React', 'JavaScript', 'CSS'],
          isActive: true
        },
        {
          id: 3,
          title: 'UI/UX Designer',
          location: 'Ramallah',
          frequency: 'Monthly',
          keywords: ['Figma', 'Adobe XD', 'UI Design'],
          isActive: false
        },
        {
          id: 4,
          title: 'Full Stack Developer',
          location: 'Remote',
          frequency: 'Daily',
          keywords: ['MongoDB', 'Express', 'React', 'Node'],
          isActive: true
        }
      ];
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('jobAlerts', JSON.stringify(this.alerts));
  }

  createAlert() {
    if (this.newAlert.title && this.newAlert.location) {
      let keywordsArray: string[] = [];
      if (typeof this.newAlert.keywords === 'string') {
        keywordsArray = (this.newAlert.keywords as string).split(',').map(k => k.trim());
      } else if (Array.isArray(this.newAlert.keywords)) {
        keywordsArray = this.newAlert.keywords;
      }

      const alert: JobAlert = {
        ...this.newAlert,
        id: Date.now(),
        keywords: keywordsArray,
        isActive: true
      };

      this.alerts.unshift(alert);
      this.saveToLocalStorage();
      this.newAlert = {
        id: 0,
        title: '',
        location: '',
        frequency: 'Daily',
        keywords: [],
        isActive: true
      };
    }
  }

  deleteAlert(id: number) {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
    this.saveToLocalStorage();
  }

  toggleAlert(id: number) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.isActive = !alert.isActive;
      this.saveToLocalStorage();
    }
  }
  updateAlert(alert: JobAlert) {
    const index = this.alerts.findIndex(a => a.id === alert.id);
    if (index !== -1) {
      this.alerts[index] = alert;
      this.saveToLocalStorage();
    }
  }
}
