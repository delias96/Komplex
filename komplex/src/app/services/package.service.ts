import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  uri = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getPackages(id:string){
    return this.http.get(`${this.uri}/packages/${id}`);
  }

  newPackages(_userObject: IUser | undefined,_newPackageForm: FormGroup){
    const packageObject = {
      senderName: _userObject?.name,
      senderPostalCode: _userObject?.postalCode,
      senderCity:_userObject?.city,
      senderAddress:_userObject?.address,
      senderTelephone:_userObject?.telephone,
      senderEmail:_userObject?.email,
      userId:_userObject?.id,
      receiverName: _newPackageForm.get('receiverName')?.value,
      receiverPostalCode:_newPackageForm.get('receiverPostalCode')?.value,
      receiverCity:_newPackageForm.get('receiverCity')?.value,
      receiverAddress:_newPackageForm.get('receiverAddress')?.value,
      receiverTelephone:_newPackageForm.get('receiverTelephone')?.value,
      receiverEmail:_newPackageForm.get('receiverEmail')?.value,
      packageDescription:_newPackageForm.get('packageDescription')?.value,
      packageWeight:_newPackageForm.get('packageWeight')?.value,
      packageWidth:_newPackageForm.get('packageWidth')?.value,
      packageLength:_newPackageForm.get('packageLength')?.value,
      packageHeight:_newPackageForm.get('packageHeight')?.value,
    };
    console.log(_userObject,packageObject);

    return this.http.post(`${this.uri}/newPackages` , packageObject);
  }

  storno(id:String){
    return this.http.get(`${this.uri}/package/${id}`);
  }
  createLabel(id:string){
    return this.http.get(`${this.uri}/createLabel/${id}`, {responseType: 'arraybuffer'});
  }
}
