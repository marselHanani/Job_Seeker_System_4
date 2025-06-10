import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

declare const FB: any;

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(
    private auth: AuthService,
    private _Router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any)['handleGoogleSignIn'] = (response: any) => {
        this.ngZone.run(() => {
          this.handleGoogleSignIn(response);
        });
      }
    }
  }

  handleGoogleSignIn(response: any) {
    try {
      const decodedToken = jwtDecode(response.credential);
      console.log('Google user data:', decodedToken);
      this.ForgetPass.patchValue({
        email: (decodedToken as any).email
      });
      this.toastr.success('Email filled from Google account', 'Success', {
        positionClass: 'toast-top-right',
        progressBar: true,
        timeOut: 3000,
      });
    } catch (error) {
      console.error('Error decoding Google token:', error);
      this.toastr.error('Failed to get email from Google', 'Error', {
        positionClass: 'toast-top-right',
        progressBar: true,
        timeOut: 3000
      });
    }
  }



  ForgetPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  isLoading = false;

  ForgetPassword(data: FormGroup) {
    if(data.valid) {
      this.isLoading = true;
      this.auth.forgetPassword(data.value).subscribe({
        next:(res) => {
          if(res.message != "Email not found") {
            this.toastr.success('Password reset email sent successfully', 'Success', {
              positionClass: 'toast-top-right',
              progressBar: true,
              timeOut: 5000
            });
          } else {
            this.toastr.error('Failed to send reset email, Email not found', 'Error', {
              positionClass: 'toast-top-right',
              progressBar: true,
              timeOut: 5000
            });
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message || 'Failed to send reset email', 'Error', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 5000
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'email' }, (userInfo: any) => {
          this.ForgetPass.patchValue({
            email: userInfo.email
          });
          this.toastr.success('Email filled from Facebook account', 'Success', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000
          });
        });
      } else {
        this.toastr.error('Failed to get email from Facebook', 'Error', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000
        });
      }
    }, { scope: 'email' });
  }
}
