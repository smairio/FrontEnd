import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  model: any;
  token: any;
  user :any;

  constructor(private router : Router,private http : HttpClient) { }

  setToken(token:string) : void{
    localStorage.setItem('token',token);
  }
  getToken() : string |null {
    return localStorage.getItem('token');
  }

  isLogin() : boolean{
    return this.getToken() != null;
  }

  Logout() : void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login(username :string , password : string){
    let url='api/v1/auth/authenticate';
    return this.http.post<any>(url,{user :username,pass :password});
  }

  jwtDecode(token : string) : any {
    return atob(token.split('.')[1]);
  }

  Ismanager():boolean{
     this.user = localStorage.getItem('user')
     this.user = JSON.parse(this.user)
    if(this.user.role==='MANAGER'){
      return true;
    } else
    return false;
  }

}


