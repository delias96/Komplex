import { Component } from '@angular/core';
import { TokenStorageService } from './services/token.storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles!: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showPackageBoard = false;
  username: string | undefined;
  constructor(private tokenStorageService: TokenStorageService){}

  ngOnInit():void{
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles = user.role;

      this.showAdminBoard = this.roles.includes('admin');
      this.showPackageBoard = this.roles.includes('user');

      this.username = user.username;
    }
  }

  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
