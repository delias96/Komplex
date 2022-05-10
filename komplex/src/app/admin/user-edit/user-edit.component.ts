import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { passwordValidator } from 'src/app/user/validators/register-validators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id!: String;
  user: any = {};
  @Input() control: FormControl = new FormControl()

 constructor(private userService:UserService,private router:Router,private route: ActivatedRoute,private snackBar:MatSnackBar) {

  }

  name = new FormControl('', [
   Validators.required,
   Validators.minLength(3)
 ])
 email = new FormControl('', [
   Validators.required,
   Validators.email
 ])
 role = new FormControl('')
 password = new  FormControl('', [
   Validators.required,
   Validators.minLength(8),
   passwordValidator() ])
 confirm_password = new FormControl('', [
   Validators.required
 ])
 telephone = new FormControl('', [
   Validators.required,
   Validators.minLength(13),
   Validators.maxLength(13)
 ])
 postalCode = new FormControl('', [
   Validators.required,
   Validators.minLength(4),
   Validators.maxLength(8)
 ])
 city = new FormControl('', [
   Validators.required,
   Validators.minLength(4),
   Validators.maxLength(20)
 ])
 address = new FormControl('', [
   Validators.required,
   Validators.minLength(1),
   Validators.maxLength(20)
 ])

 updateForm = new FormGroup({
   name: this.name,
   email: this.email,
   role: this.role,
   password: this.password,
   confirm_password: this.confirm_password,
   telephone: this.telephone,
   postalCode:this.postalCode,
   city:this.city,
   address:this.address,
 })

 ngOnInit(): void {
   this.route.params.subscribe((params) =>{
     this.id = params.id;
     this.userService.getUsersById(this.id).subscribe((res)=>{
       this.user = res;
       console.log(this.user);

       this.updateForm.get('name')?.setValue(this.user.name);
       this.updateForm.get('email')?.setValue(this.user.email);
       this.updateForm.get('role')?.setValue(this.user.role);
       this.updateForm.get('password')?.setValue(this.user.password);
       this.updateForm.get('telephone')?.setValue(this.user.telephone);
       this.updateForm.get('postalCode')?.setValue(this.user.postalCode);
       this.updateForm.get('city')?.setValue(this.user.city);
       this.updateForm.get('address')?.setValue(this.user.address);
     });
   })
 }

 update(){
   this.userService.updateUser(this.id,this.updateForm.get('name')?.value,this.updateForm.get("password")?.value,this.updateForm.get("postalCode")?.value,this.updateForm.get("city")?.value,this.updateForm.get("address")?.value,this.updateForm.get("telephone")?.value,this.updateForm.get("email")?.value,this.updateForm.get("role")?.value).subscribe(()=>{
     this.snackBar.open('User updated successfully', 'OK',{
       duration:3000
     });
   });
 }


}
