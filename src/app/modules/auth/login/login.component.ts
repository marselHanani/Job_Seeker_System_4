import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const FB: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        console.log('Login successful');
        // Handle successful login
      } else {
        console.log('Login failed');
        // Handle failed login
      }
    });
  }
}
