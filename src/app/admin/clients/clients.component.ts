import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from './add-client/add-client.component';
import { HttpClient } from '@angular/common/http';
import { ClientService  } from 'src/app/service/client.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SuccessMessageService } from 'src/app/service/success-message.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'companyname', 'email', 'firstname', 'lastname', 'phone_number', 'fax', 'gender', 'action'];

  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _dialog:MatDialog,
              private http:HttpClient,
              private clientService : ClientService,
              private _successMessage : SuccessMessageService
              ){}

  ngOnInit(): void {
    this.getClients();
  }


  getClients() : any{
    this.clientService.getClients().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error :(err) => {
        console.log(err);
      }
    });
  }

  deleteClient(id : number){
    this.clientService.deleteClient(id).subscribe({
      next : (res) => {
        this._successMessage.openSnackBar("Client deleted!", "done");
        this.getClients();
      },
      error : (err) =>{
        console.log(err)
      }
    })
  }
  
  openAddClient(){
    const dialogRef = this._dialog.open(AddClientComponent);
    dialogRef.afterClosed().subscribe({
      next :(res) =>{
        if(res){
        this.getClients();
        }
      }
    })
    
  }

  openEditClient(data : any){
    const dialogRef = this._dialog.open(AddClientComponent,{
    data :data
   });
   dialogRef.afterClosed().subscribe({
    next : (res) =>{
      if(res){
        this.getClients();
      }
    }
   })


    
  }

  openDeleteConfirmationDialog(data: any,name:string) {
    const dialogRef = this._dialog.open(DeleteConfirmationComponent,{
      data : name
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion, perform the deletion action
        this.deleteClient(data.id);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
