import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { passwordValidator } from 'src/app/user/validators/register-validators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  role = new FormControl('');
  password = new FormControl('', [
    Validators.required,
   Validators.minLength(8),
   passwordValidator()
  ]);
  telephone = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);
  postalCode = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8),
  ]);
  city = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
  ]);
  address = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(20),
  ]);

  adminUserRegisterForm = new FormGroup({
    name: this.name,
    email: this.email,
    role: this.role,
    password: this.password,
    telephone: this.telephone,
    postalCode: this.postalCode,
    city: this.city,
    address: this.address,
  });
  addUser() {
    this.userService
      .addUser(
        this.adminUserRegisterForm.get('name')?.value,
        this.adminUserRegisterForm.get('password')?.value,
        this.adminUserRegisterForm.get('postalCode')?.value,
        this.adminUserRegisterForm.get('city')?.value,
        this.adminUserRegisterForm.get('address')?.value,
        this.adminUserRegisterForm.get('telephone')?.value,
        this.adminUserRegisterForm.get('email')?.value,
        this.adminUserRegisterForm.get('role')?.value
      )
      .subscribe(() => {
        this.router.navigate(['/admin']);
      });
  }
}
