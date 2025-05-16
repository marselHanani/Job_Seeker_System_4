import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'userToken';
  private readonly USER_TYPE_KEY = 'userType'; // Add this line
  public tokenSubject: BehaviorSubject<string | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const initialToken = this.getStorageItem(this.TOKEN_KEY);
    this.tokenSubject = new BehaviorSubject<string | null>(initialToken);
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem(this.TOKEN_KEY, value);
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.tokenSubject.next(value);
  }

  get user(): any | null {
    if (this.token) {
      try {
        return JSON.parse(this.token);
      } catch {
        return null;
      }
    }
    return null;
  }

  getUserType(): 'job-seeker' | 'employer' | 'admin' {
    if (isPlatformBrowser(this.platformId)) {
      const userType = localStorage.getItem(this.USER_TYPE_KEY);
      if (userType === 'admin' || userType === 'employer' || userType === 'job-seeker') {
        return userType;
      }
    }
    return 'job-seeker'; // Default type
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
}
