import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employer',
  templateUrl: './create-employer.component.html',
  styleUrls: ['./create-employer.component.css'],
  imports: [ReactiveFormsModule]
})
export class CreateEmployerComponent implements OnInit {
  createEmployerForm: FormGroup;
  @Output() employerCreated = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.createEmployerForm = this.fb.group({
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createEmployerForm.valid) {
      const employerData = this.createEmployerForm.value;
      this.employerCreated.emit(employerData);
      console.log('Employer created:', employerData); // Debugging log
    } else {
      console.log('Form is invalid'); // Debugging log
    }
  }
}
