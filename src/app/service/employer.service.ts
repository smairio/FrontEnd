import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http : HttpClient) { }

  addEmployer(data : any): Observable <any>{
    return this.http.post("api/v1/auth/register",data);
  }

  getEmployers(): Observable <any>{
    return this.http.get("/api/users");
  }

  deleteEmployer(id : number) :Observable <any>{
    return this.http.delete("api/users/"+id)
  }
  updateEmployer(id : number,data : any) :Observable<any>{
    return this.http.put('api/users/'+id,data);
  }
}
