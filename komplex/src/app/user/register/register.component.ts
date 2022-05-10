import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private authService:AuthService,
  ) {}

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new  FormControl('', [
    Validators.required,
    Validators.minLength(8),
    passwordValidator()
  ])
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
    Validators.minLength(4),
    Validators.maxLength(20)
  ])
  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirm_password: this.confirm_password,
    telephone: this.telephone,
    postalCode:this.postalCode,
    city:this.city,
    address:this.address,
  })

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'

    try {
      if(this.registerForm.get('password')?.value != this.registerForm.get('confirm_password'))
      this.authService.register(this.registerForm).subscribe((data) =>{
        console.log(data);
      })
    } catch(e) {
      console.error(e)

      this.alertMsg = 'An unexpected error occurred. Please try again later'
      this.alertColor = 'red'
      return
    }

    this.alertMsg = 'Success! Your account has been created.'
    this.alertColor = 'green'
  }
}
