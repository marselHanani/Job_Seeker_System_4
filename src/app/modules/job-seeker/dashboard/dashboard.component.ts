import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('visitorChart') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
