import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  private userId: string | null = null;

  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
  ResetPassword(data: FormGroup) {
    if (data.valid) {
      this.auth.resetPassword(this.userId, data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  ResetPass: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#%^&+=!])(?=\\S+$).{8,}$')
    ]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, { validators: this.passwordMatchValidator });
}
