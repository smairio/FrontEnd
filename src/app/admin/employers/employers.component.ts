import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployerComponent } from './add-employer/add-employer.component';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SuccessMessageService } from 'src/app/service/success-message.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { EmployerService } from 'src/app/service/employer.service';
import { ErrorComponentComponent } from '../error-component/error-component.component';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'phone_number', 'email', 'address', 'role', 'action'];

  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _dialog:MatDialog,
              private http:HttpClient,
              private employerService : EmployerService,
              private _successMessage : SuccessMessageService
              ){}
  
  ngOnInit(): void {
    this.getEmployers();
  }
  
  getEmployers() : any{
    this.employerService.getEmployers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.data.forEach(item => {
          item.password = '0';
        });
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
      },
      error :(err) => {
        console.log(err);
      }
    });
  }

  deleteEmployer(id : number){
    this.employerService.deleteEmployer(id).subscribe({
      next : (res) => {
        this._successMessage.openSnackBar("Employer deleted!", "done");
        this.getEmployers();
      },
      error : (err) =>{
        console.log(err)
      }
    })
  }

  openAddEmployer(){
    const dialogRef = this._dialog.open(AddEmployerComponent);
    dialogRef.afterClosed().subscribe({
      next :(res) =>{
        if(res){
        this.getEmployers();
        }
      }
    })
    
  }

  openEditEmployer(data : any){
    const dialogRef = this._dialog.open(AddEmployerComponent,{
    data :data
   });
   dialogRef.afterClosed().subscribe({
    next : (res) =>{
      if(res){
        this.getEmployers();
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
        this.deleteEmployer(data.id);
      }
    });
  }

  openErrorDisplayDialogue(data: any) {
    const dialogRef = this._dialog.open(ErrorComponentComponent,{
      data : data
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
