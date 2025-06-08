import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'userToken';
  private readonly USER_TYPE_KEY = 'userType';
  private readonly USER_ID_KEY = 'userId';
  private _token = new BehaviorSubject<string | null>(null);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _HttpClient: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      this._token.next(token);
    }
  }

  get token$() {
    return this._token.asObservable();
  }

  get token(): string | null {
    return this._token.value;
  }

  set token(value: string | null) {
    if (isPlatformBrowser(this.platformId)) {
      if (value) {
        localStorage.setItem(this.TOKEN_KEY, value);
      } else {
        localStorage.removeItem(this.TOKEN_KEY);
      }
    }
    this._token.next(value);
  }

  get user(): any | null {
    if (this.token) {
      try {
        return jwtDecode(this.token);
      } catch {
        return null;
      }
    }
    return null;
  }

  getUserType(): 'job-seeker' | 'employer' | 'admin' {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          console.log(decoded);
          if (decoded && decoded.role) {
            return decoded.role;
          }
        } catch (e) {
          return 'job-seeker';
        }
      }
    }
    return 'job-seeker';
  }

  setUserType(type: 'job-seeker' | 'employer' | 'admin') {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_TYPE_KEY, type);
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private getStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }


  register(data:any):Observable<any>{
    return this._HttpClient.post('http://127.0.0.1:8000/api/register',data);
  }

  login(data:any):Observable<any>{
    return this._HttpClient.post('http://127.0.0.1:8000/api/login',data);
  }
  saveCurrentUser(){
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      this.token = token;
    }
  }

  forgetPassword(data:any):Observable<any>{
    return this._HttpClient.post('http://127.0.0.1:8000/api/forget-password',data);
  }

  resetPassword(id:String|null , data: any): Observable<any> {
    return this._HttpClient.post(`http://127.0.0.1:8000/api/reset-password/${id}`, data);
  }

  registerWithGoogle(data:any):Observable<any>{
     return this._HttpClient.post('http://127.0.0.1:8000/api/google-register',data);
  }

  loginWithGoogle(data:any):Observable<any>{
    return this._HttpClient.post('http://127.0.0.1:8000/api/google-login',data);
  }

   // Get the current authenticated user's ID
   getCurrentUserId(): string {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem(this.USER_ID_KEY);
      if (userId) {
        return userId;
      }
    }
    // If no user ID is found, return an empty string
    // In a real app, you would redirect to login
    return '';
  }

  // Set the current user ID in localStorage
  setCurrentUserId(userId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_ID_KEY, userId);
    }
  }
}
