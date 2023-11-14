import { Component, OnInit } from '@angular/core';

import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              private router: Router) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirm() {
    this.router.navigate(['/start']);
    this.dialogRef.close();
  }

}
