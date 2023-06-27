import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectsService} from "../../../service/projects.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SuccessMessageService} from "../../../service/success-message.service";
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})

export class AddProjectComponent implements OnInit {
  clients: any[] = [];
  projectForm : FormGroup;


  constructor(
    private clientService : ClientService,
    private _formBuilder : FormBuilder,
    private projectService : ProjectsService,
    private _dialogRef : MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _successMessage : SuccessMessageService,
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.projectForm = this._formBuilder.group({
      title : ['',Validators.required],
      client: [null, Validators.required],
      service : ['',Validators.required],
      description : ['',Validators.required],
      website : ['',Validators.required],
      status : ['',Validators.required],
      submit_date : [new FormControl(new Date(year, month, 15))],
      start_date: [new FormControl(new Date(year, month, 15))],
      end_date: [new FormControl(new Date(year, month, 19))],
      
    })
  }
  ngOnInit(){
    this.getAllClients();
    this.projectForm.patchValue(this.data);
  }
  get title() {
    return this.projectForm.get('title')
  }
  get client(){
    return this.projectForm.get('client')
  }
  get service(){
    return this.projectForm.get('service')
  }
  get description(){
    return this.projectForm.get('description')
  }
  get website(){
    return this.projectForm.get('website')
  }
  get status(){
    return this.projectForm.get('status')
  }
  get start_date(){
    return this.projectForm.get('start_date')
  }
  get end_date(){
    return this.projectForm.get('end_date')
  }


  onFormSubmit() {
    if (this.projectForm.valid) {
      this.client?.setValue({"id": parseInt(this.client.value)})
      if(this.data){
        console.log(this.projectForm)
        this.projectService.updateProject(this.data.id,this.projectForm.value).subscribe({
          next : (res) => {
            this._successMessage.openSnackBar("Project Updated!", "done");
            console.log(res);
            this._dialogRef.close(true);
          },
          error : (err) => {
            console.log(err)
          }
        });
      }
      else {
        console.log(this.projectForm)
      this.projectService.addProject(this.projectForm.value).subscribe({
        next:(val : any)=>{
          this._successMessage.openSnackBar("Project added!", "done");
          this._dialogRef.close(true);
        },
        error:(err :any)=>{
          console.log(err)
        }
      })

    }
  }
  }
  getAllClients(){
    this.clientService.getClients().subscribe({
      next : (res) => {
        this.clients=res;
      }
    })
  }
}
