import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserType(): 'job-seeker' | 'employer' | 'admin' {
    return localStorage.getItem('userType') as 'job-seeker' | 'employer' | 'admin';
  }
}
