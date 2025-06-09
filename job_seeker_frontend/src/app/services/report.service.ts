import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Report {
  id: number;
  title: string;
  type: string;
  last_updated: string;
  views: number;
  downloads: number;
  icon: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8000/api/reports';

  constructor(private http: HttpClient) { }

  getReports(searchTerm: string = '', filterType: string = 'All Reports'): Observable<Report[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    if (filterType !== 'All Reports') {
      params = params.set('filter', filterType);
    }
    return this.http.get<Report[]>(this.apiUrl, { params });
  }

  createReport(reportData: any): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, reportData);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadReport(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/download`, {});
  }

  shareReport(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/share`, {});
  }
}
