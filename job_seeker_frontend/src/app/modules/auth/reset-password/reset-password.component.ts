import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
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

  isLoading = false;

  ResetPassword(data: FormGroup) {
    if (data.valid) {
      this.isLoading = true;
      this.auth.resetPassword(this.userId, data.value).subscribe({
        next: (res) => {
          this.toastr.success('Password reset successful', 'Success', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 5000
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toastr.error(err.error.message || 'Failed to reset password', 'Error', {
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

  ResetPass: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#%^&+=!])(?=\\S+$).{8,}$')
    ]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, { validators: this.passwordMatchValidator });
}
