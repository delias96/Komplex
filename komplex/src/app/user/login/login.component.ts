import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token.storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:any = {};
  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = 'blue'
  isLoggedIn = false;
  roles:string[] = [];

  constructor(private authService:AuthService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait! We are logging you in.'
    this.alertColor = 'blue'

      this.authService.login(this.form).subscribe((data) =>{
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        this.reloadPage();
      })
      this.alertMsg = 'An unexpected error occurred. Please try again later.'
      this.alertColor = 'red'
    if(this.isLoggedIn == true){
      this.alertMsg = 'Success! You are now logged in.'
      this.alertColor = 'green'
    }
  }

  reloadPage():void {
    window.location.reload();
  }

}
