import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, NgIf]
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  goHome() {
    this.dialog.open(DialogComponent);
  }

  get isHome() {
    return this.router.url.includes('start');
  }

}
