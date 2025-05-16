import { Component, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { AuthService } from '../../../core/auth/auth.service';
import {jwtDecode} from 'jwt-decode';

declare const FB: any;

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
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
    rules: new FormControl(false, Validators.requiredTrue)
  }, {validators: this.passwordMatchValidator});

  SaveData(formGroup: FormGroup) {
    const userData = JSON.stringify(formGroup.value);
    localStorage.setItem(formGroup.value.username + 'Info', userData);
    localStorage.setItem('lastRegisteredUser', formGroup.value.username);
    formGroup.reset();
    this._Router.navigate(['/login']);
  }

  handleGoogleSignUp(response: any) {
    try {
      const decodedToken = jwtDecode(response.credential);
      console.log('Google user data:', decodedToken);
      this.RegisterForm.patchValue({
        username: (decodedToken as any).name,
        email: (decodedToken as any).email
      });
    } catch (error) {
      console.error('Error decoding Google token:', error);
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
