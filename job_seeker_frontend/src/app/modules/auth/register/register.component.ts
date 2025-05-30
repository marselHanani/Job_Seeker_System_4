import { Component, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { AuthService } from '../../../core/auth/auth.service';
import {jwtDecode} from 'jwt-decode';

declare const FB: any;
declare const google: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _Router: Router,
    private auth: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGoogleSignUp();
    }
  }

  registerErrors: string[] = [];
  private initializeGoogleSignUp(): void {
    (window as any).handleGoogleSignUp = (response: any) => {
      this.ngZone.run(() => {
        this.handleGoogleSignUp(response);
      });
    };
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return {passwordMismatch: true};
    }
    return null;
  }

  RegisterForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
    rules: new FormControl(false, Validators.requiredTrue),
    role_id: new FormControl(3),
  }, {validators: this.passwordMatchValidator});

  register(formGroup: FormGroup){
    if (formGroup.valid) {
      const userData = formGroup.value;
      this.auth.register(userData).subscribe({
        next: (response) => {
          if(response.message ==="Verification email sent, Please verify your email within 10 minutes"){
            this._Router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.registerErrors = error.error.errors;
        }
      })
    }
  }

  signUpWithGoogle() {
    const client = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: '1041401952762-nesjnl04bfl9g28gf8aclj3impjhsvno.apps.googleusercontent.com',
      scope: 'email profile',
      callback: (response: any) => {
        this.ngZone.run(() => {
          this.handleGoogleSignUp(response);
        });
      }
    });
    client.requestAccessToken();
  }

  handleGoogleSignUp(response: any) {
    try {
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`
        }
      })
      .then(res => res.json())
      .then(userInfo => {
        this.auth.registerWithGoogle({
          username: userInfo.name,
          email: userInfo.email
        }).subscribe({
          next: (res) => {
            this.auth.token = res.token;
            this._Router.navigate(['/home']);
          },
          error: (err) => {
            console.error(err);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  registerWithFacebook(formGroup: FormGroup) {
    FB.login((response: any) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'name,email,picture' }, (userInfo: any) => {
          console.log('Facebook user data:', userInfo);
          this.RegisterForm.patchValue({
            username: userInfo.name,
            email: userInfo.email
          });

          const facebookData = {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture?.data?.url
          };
          console.log('Facebook registration data:', facebookData);
        });
      } else {
        console.log('Facebook registration failed');
      }
    }, { scope: 'email,public_profile' });
  }
}
