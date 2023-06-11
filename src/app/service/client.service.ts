import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { 
  }

  addClient(data : any): Observable <any>{
    return this.http.post("/api/clients",data);
  }

  getClients(): Observable <any>{
    return this.http.get("/api/clients");
  }

  deleteClient(id : number) :Observable <any>{
    return this.http.delete("api/clients/"+id)
  }
  updateClient(id : number,data : any) :Observable<any>{
    return this.http.put('api/clients/'+id,data);
  }
}
