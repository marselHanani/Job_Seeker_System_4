import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const FB: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        // Get user information for registration
        FB.api('/me', { fields: 'name,email' }, (userInfo: any) => {
          console.log('Facebook registration successful', userInfo);
          // Handle registration logic here
        });
      } else {
        console.log('Facebook registration failed');
        // Handle registration failure
      }
    }, { scope: 'email,public_profile' });
  }
}
