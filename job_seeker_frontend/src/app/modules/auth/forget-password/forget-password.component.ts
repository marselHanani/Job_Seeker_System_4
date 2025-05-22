import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../../../core/auth/auth.service';

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
    private auth :AuthService,
    private _Router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
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
    } catch (error) {
      console.error('Error decoding Google token:', error);
    }
  }

  navigate() {
    if (this.ForgetPass.valid) {
      this._Router.navigate(['reset-password']);
    }
  }

  ForgetPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  ForgetPassword(data: FormGroup) {
    if(data.valid){
      this.auth.forgetPassword(data.value).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }


  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'email' }, (userInfo: any) => {
          console.log('Facebook login successful', userInfo);
          this.ForgetPass.patchValue({
            email: userInfo.email
          });
        });
      } else {
        console.log('Facebook login failed');
      }
    }, { scope: 'email' });
  }
}
