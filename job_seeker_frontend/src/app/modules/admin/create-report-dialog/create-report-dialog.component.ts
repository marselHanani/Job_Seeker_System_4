import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-report-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create-report-dialog.component.html',
  styleUrls: ['./create-report-dialog.component.css']
})
export class CreateReportDialogComponent {
  report = {
    title: '',
    type: '',
    description: ''
  };

  constructor(private dialogRef: MatDialogRef<CreateReportDialogComponent>) {}

  onSubmit() {
    this.dialogRef.close(this.report);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
