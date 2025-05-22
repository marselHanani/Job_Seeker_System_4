import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports:[ReactiveFormsModule,CommonModule],
})
export class AddUserComponent {
  addUserForm: FormGroup;
  roles: string[] = ['admin', 'employer', 'job-seeker'];
  submitted = false;

  constructor() {
    this.addUserForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#%^&+=!])(?=\\S+$).{8,}$')
      ]),
      role: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.valid) {
      // هنا يمكنك إرسال البيانات إلى السيرفر أو تنفيذ أي منطق آخر
      console.log(this.addUserForm.value);
      // إعادة تعيين النموذج بعد الإضافة (اختياري)
      this.addUserForm.reset();
      this.submitted = false;
    }
  }
}
