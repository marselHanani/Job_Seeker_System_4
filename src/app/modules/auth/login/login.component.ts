import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    const decodedToken = this.decodeJwtResponse(response.credential);
    console.log('Google user data:', decodedToken);
    this.LoginForm.patchValue({
      username: decodedToken.name,
      password: decodedToken.password
    });
  }

    private decodeJwtResponse(token: string) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }


  LoginForm: FormGroup = new FormGroup({
    username : new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl(null,[Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#%^&+=!])(?=\\S+$).{8,}$'),Validators.required])
  })

  printData(formGroup:FormGroup){
    console.log(formGroup.value);
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
