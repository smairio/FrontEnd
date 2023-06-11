import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
AuthService
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  model :  any = {};
  token : any = "";

  constructor(
    private router : Router,
    private http : HttpClient,
    private authService :AuthService
  ) {}

  ngOnInit(){
    if(this.authService.isLogin()){
      this.router.navigate(['admin'])
    }
  }

  
  login(){
    let url='api/v1/auth/authenticate';
    this.http.post<any>(url,{username :this.model.username,
                              password :this.model.password}).subscribe(response =>{
                                if (response){
                                  this.token=response.token;
                                  this.authService.setToken(this.token)
                                 localStorage.setItem('user',this.authService.jwtDecode(this.token));
                                 if(this.authService.Ismanager())
                                 {
                                  this.router.navigate(['admin']);
                                } else {
                                  this.router.navigate(['user']);

                                }
                                }
                              },
                              error => {
                                if (error){
                                  window.alert('Authentication Failed');
                                }
                              }
                              );
  }

}
