import { Component, OnInit ,ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SuccessMessageService } from 'src/app/service/success-message.service';
import {ProjectsService} from "../../service/projects.service";
import { AddProjectComponent } from './add-project/add-project.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'client', 'service', 'website', 'status', 'start_date', 'end_date', 'action' ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private projectService: ProjectsService,
              private _dialog :MatDialog,
              private _successMessage:SuccessMessageService ) {
                
             }

  ngOnInit() {
    this.getProjects();
  }


  getProjects(): any {
    return this.projectService.getAllProjects().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openEditProject(data : any){
    const dialogRef = this._dialog.open(AddProjectComponent,{
    data :data
   });
   dialogRef.afterClosed().subscribe({
    next : (res) =>{
      if(res){
        this.getProjects();
      }
    }
   })
  }

  deleteProject(id : number) : any {
    this.projectService.deleteProject(id).subscribe({
      next : (res) => {
        this._successMessage.openSnackBar("Project deleted!", "done");
        this.getProjects();
      },
      error : (err) => {
        console.log(err)
      }
    })
  }
  openAddProject(){
    const dialogRef = this._dialog.open(AddProjectComponent);
    dialogRef.afterClosed().subscribe({
      next :(res) =>{
        if(res){
          this.getProjects()
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
        this.deleteProject(data.id);
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
