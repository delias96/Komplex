import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { TokenStorageService } from '../services/token.storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private roles!: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showPackageBoard = false;
  username: string | undefined;
  constructor(private tokenStorageService: TokenStorageService,public modal: ModalService,){}

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

  openModal($event: Event) {
    $event.preventDefault()

    this.modal.toggleModal('auth')
  }
}
