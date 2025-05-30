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
  ) {}

  signInWithGoogle(){
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
            this._Router.navigate(['/home']);
          },
        })

      });
    } catch (error) {
      console.error('error Google:', error);
    }
  }

  LoginForm: FormGroup = new FormGroup({
    username : new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl(null,[Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#%^&+=!])(?=\\S+$).{8,}$'),Validators.required])
  })

  Login(data: FormGroup) {
    if(data.valid){
      this.auth.login(data.value).subscribe({
        next:(res)=>{
          if(res.message === 'Login successfully'){
            localStorage.setItem('userToken',res.token);
            this.auth.saveCurrentUser();
            this._Router.navigate(['/home'])
          }
        }
      })
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
