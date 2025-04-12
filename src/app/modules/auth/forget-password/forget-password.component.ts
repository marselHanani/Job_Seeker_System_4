import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';
declare const FB: any;
@Component({
  selector: 'app-forget-password',
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(private _Router:Router){}
  navigate(){
    this._Router.navigate(['reset-password']);
  }

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
