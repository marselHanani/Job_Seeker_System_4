import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import {jwtDecode}  from 'jwt-decode';

declare const FB: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _Router: Router,
    private auth: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGoogleSignIn();
    }
  }

  private initializeGoogleSignIn(): void {
    (window as any).handleGoogleSignIn = (response: any) => {
      this.ngZone.run(() => {
        this.handleGoogleSignIn(response);
      });
    };
  }

  handleGoogleSignIn(response: any) {
    try {
      const decodedToken = jwtDecode(response.credential);
      this.LoginForm.patchValue({
        username: (decodedToken as any).name,
        password: (decodedToken as any).sub
      });
    } catch (error) {
      console.error('error Google:', error);
    }
  }

  LoginForm: FormGroup = new FormGroup({
    username : new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl(null,[Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#%^&+=!])(?=\\S+$).{8,}$'),Validators.required])
  })
  adminInfo = {
    username: "marsel",
    email : "marsel@gmail.com",
    password:"Marsel@123"
  }

  printData(formGroup: FormGroup) {
    if (isPlatformBrowser(this.platformId)) {
      if (
        formGroup.value.username === this.adminInfo.username &&
        formGroup.value.password === this.adminInfo.password
      ) {
        this.auth.token = JSON.stringify(this.adminInfo);
        localStorage.setItem('userType', 'admin');
        // Set the user ID for the admin user
        this.auth.setCurrentUserId('admin1');
        this._Router.navigateByUrl('/dashboard');
        return;
      }

      const userDataStr = localStorage.getItem(formGroup.value.username + 'Info');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (
          userData.username === formGroup.value.username &&
          userData.password === formGroup.value.password
        ) {
          this.auth.token = userDataStr;
          const username = userData.username.toLowerCase();
          
          // Set the user ID based on the username
          // In a real app, this would be the user's actual ID from the database
          this.auth.setCurrentUserId(userData.id || username);
          
          if (username === 'admin') {
            localStorage.setItem('userType', 'admin');
          } else if (username === 'employer') {
            localStorage.setItem('userType', 'employer');
          } else {
            localStorage.setItem('userType', 'job-seeker');
          }

          localStorage.setItem('currentUserImage', userData.image || '');
          this._Router.navigateByUrl('/dashboard');
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('User not found');
      }
    }
  }
  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    });
  }


}
