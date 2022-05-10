import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { IUser } from '../models/user.model';
import { PackageService } from '../services/package.service';
import { TokenStorageService } from '../services/token.storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean | undefined;
  userObject: IUser | undefined;

  constructor(private packageService:PackageService,private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.userObject = user;
    }
  }

  receiverName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  receiverEmail = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  receiverTelephone = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])
  receiverPostalCode = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8)
  ])
  receiverCity = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ])
  receiverAddress = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ])
  packageDescription = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(100)
  ])
  packageWeight = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ])
  packageWidth = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000)
  ])
  packageLength = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000)
  ])
  packageHeight = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000)
  ])
  newPackageForm = new FormGroup({
    receiverName: this.receiverName,
    receiverEmail: this.receiverEmail,
    receiverTelephone: this.receiverTelephone,
    receiverPostalCode:this.receiverPostalCode,
    receiverCity:this.receiverCity,
    receiverAddress:this.receiverAddress,
    packageDescription:this.packageDescription,
    packageWeight:this.packageWeight,
    packageWidth:this.packageWidth,
    packageLength:this.packageLength,
    packageHeight:this.packageHeight
  })

  addPackage(){
    this.packageService.newPackages(this.userObject,this.newPackageForm).subscribe(() => {

    }, (err) => {
      console.error(err);
    })
  }
}
