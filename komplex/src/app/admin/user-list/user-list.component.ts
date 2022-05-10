import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: IUser[];
  displayedColumns = ['email','name','telephone','city','postalCode','address','role','actions'];

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
    this.userService.getUsers().subscribe((data:any)=>{
      this.users = data;
    })
  }

  editUser(id:any){
    this.router.navigate([`admin/edit/${id}`]);
  }
  deleteUser(id:any){
    this.userService.deleteUser(id).subscribe(()=>{
      this.fetchUsers();
    });
  }
}
