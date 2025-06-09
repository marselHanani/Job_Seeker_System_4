import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employer } from '../modules/employer/employer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
 private apiUrl = 'http://127.0.0.1:8000/api/employers'; 


  constructor(private http: HttpClient) {}

  
  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(this.apiUrl);
  }

  
  updateEmployerStatus(id: number, status: string): Observable<Employer> {
    return this.http.patch<Employer>(`${this.apiUrl}/${id}`, { status });
  }

  
  updateEmployer(id: number, data: Partial<Employer>): Observable<Employer> {
    return this.http.put<Employer>(`${this.apiUrl}/${id}`, data);
  }
}
