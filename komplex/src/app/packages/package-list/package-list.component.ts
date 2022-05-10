import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPackage } from 'src/app/models/package.model';
import { IUser } from 'src/app/models/user.model';
import { PackageService } from 'src/app/services/package.service';
import { TokenStorageService } from 'src/app/services/token.storage.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  packages!: IPackage[];
  displayedColumns = ['trackingNumber','receiverName','receiverPostalCode','receiverCity','receiverAddress','packageDescription','packageWeight','meisurments','actions'];
  isLoggedIn!: boolean;
  userObject!: IUser;

  constructor(private packageService:PackageService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.userObject = user;
    }
    this.fetchPackages();
  }

  fetchPackages(){
    this.packageService.getPackages(this.userObject.id).subscribe((data:any)=>{
      this.packages = data;
    })
  }

  stornoPackage(id:any){
    this.packageService.storno(id).subscribe(()=>{
      this.fetchPackages();
    });
  }
  print(id:any){
    this.packageService.createLabel(id).subscribe((pdfBuffer) => {
      const blob = new Blob([pdfBuffer], {type: "application/pdf"});
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl);
    }, (err) => {
      console.error(err);
    })
  }

}
