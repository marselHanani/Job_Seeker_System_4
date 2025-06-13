import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(page: number = 1, limit: number = 10): Observable<any> {
    const token = this.authService.token;
    const skip = (page - 1) * limit;

    if (!token) {
      console.error('Token not found. Please log in to access this resource.');
      throw new Error('Token not found. Please log in to access this resource.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&skip=${skip}`, { headers });
  }
}
