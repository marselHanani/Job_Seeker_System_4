import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr'

declare const FB: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _Router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  signInWithGoogle() {
    const client = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: '1041401952762-nesjnl04bfl9g28gf8aclj3impjhsvno.apps.googleusercontent.com',
      scope: 'email profile',
      callback: (response: any) => {
        this.ngZone.run(() => {
          this.handleGoogleSignIn(response);
        });
      }
    });
    client.requestAccessToken();
  }

  handleGoogleSignIn(response: any) {
    try {
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`
        }
      })
        .then(res => res.json())
        .then(userInfo => {
          this.auth.loginWithGoogle({
            username: userInfo.name,
            email: userInfo.email
          }).subscribe({
            next: (res) => {
              this.auth.token = res.token;
              this.toastr.success('Login successful!', 'Welcome', {
                timeOut: 2000,
                progressBar: true,
                closeButton: true
              });
              this._Router.navigate(['/home']);
            },
            error: (err) => {
              this.toastr.error(err.error.message || 'Error logging in with Google', 'Error', {
                timeOut: 3000,
                progressBar: true,
                closeButton: true
              });
            }
          });
        });
    } catch (error) {
      this.toastr.error('Error connecting to Google service', 'Error', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true
      });
    }
  }

  LoginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#%^&+=!])(?=\\S+$).{8,}$'), Validators.required])
  });

  isLoading = false;

  Login(data: FormGroup) {
    if (data.valid) {
      this.isLoading = true;
      this.auth.login(data.value).subscribe({
        next: (res) => {
          localStorage.setItem('userToken', res.token);
          this.auth.saveCurrentUser();

          this.toastr.success('Login successfully', 'Welcome', {
            timeOut: 2000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error(err.error.message || 'Login failed pleas check username or password', 'Error', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
}

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        this.toastr.success('Successfully logged in with Facebook!', 'Welcome', {
          timeOut: 2000,
          progressBar: true,
          closeButton: true
        });
      } else {
        this.toastr.error('Failed to login with Facebook', 'Error', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }
}
