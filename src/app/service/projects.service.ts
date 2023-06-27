import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http : HttpClient) { }

  getAllProjects() : Observable<any>{
    return this.http.get("/api/projects")
  }

  getProjetByid(id : number) : Observable<any> {
    return this.http.get("/api/projects/"+id);
  }

  addProject( data : any) : Observable<any> {
    return this.http.post("api/projects/",data);
  }

  updateProject( id : number, data :any) : Observable<any> {
    return this.http.put("/api/projects/"+id, data);
  }

  deleteProject(id : number) : Observable<any> {
    return this.http.delete("/api/projects/"+id);
  }
}
