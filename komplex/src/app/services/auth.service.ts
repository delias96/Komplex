import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";

const AUTH_API = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn:'root'
})
export class AuthService {
  constructor(private http:HttpClient){}

  login(credentials:any):Observable<any>{
    return this.http.post(AUTH_API+'signin',{
      email: credentials.email,
      password: credentials.password
    });
  }

  register(user:FormGroup) : Observable<any> {
    return this.http.post(AUTH_API+'signup', {
      name: user.controls.name.value,
      email: user.controls.email.value,
      password: user.controls.password.value,
      telephone: user.controls.telephone.value,
      postalCode:user.controls.postalCode.value,
      city:user.controls.city.value,
      address:user.controls.address.value,
    });
  }
}

