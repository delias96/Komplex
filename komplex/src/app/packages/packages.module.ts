import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from './package-list/package-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    PackageListComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
  ]
})
export class PackagesModule { }
