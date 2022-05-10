import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.uri}/users`);
  }
  getUsersById(id: String){
    return this.http.get(`${this.uri}/user/${id}`);
  }
  addUser(name:String,password:String,postalCode:String,city:String,address:String,telephone:String,email:String,role:String){
    const user = {
      name:name,
      password:password,
      postalCode:postalCode,
      city:city,
      address:address,
      telephone:telephone,
      email:email,
      role:role,
    }
    return this.http.post(`${this.uri}/auth/signup`, user);
  }
  addUserWithoutAdmin(name:String,password:String,postalCode:String,city:String,address:String,telephone:String,email:String){
    const user = {
      name:name,
      password:password,
      postalCode:postalCode,
      city:city,
      address:address,
      telephone:telephone,
      email:email,
    }
    return this.http.post(`${this.uri}/auth/signup`, user);
  }
  updateUser(id:String,name:String,password:String,postalCode:String,city:String,address:String,telephone:String,email:String,role:String){
    const user = {
      id:id,
      name:name,
      password:password,
      postalCode:postalCode,
      city:city,
      address:address,
      telephone:telephone,
      email:email,
      role:role,
    }
    return this.http.post(`${this.uri}/user/update/${id}`, user);
  }
  deleteUser(id: String){
    return this.http.delete(`${this.uri}/user/${id}`);
  }
}
