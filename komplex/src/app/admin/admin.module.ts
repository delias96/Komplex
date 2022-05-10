import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent
  ],
  imports: [
    AppRoutingModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    SharedModule,
    CommonModule,
  ]
})
export class AdminModule { }
