import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/service/client.service';
import { SuccessMessageService } from 'src/app/service/success-message.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit{

  clientForm : FormGroup;
  submitted: boolean = false;
  
  constructor(private _formBuilder: FormBuilder,
              private clientService : ClientService,
              private _dialogRef:MatDialogRef<AddClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private _successMessage : SuccessMessageService,

            ){
              this.clientForm = this._formBuilder.group({
                companyname: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
                email: ['', [Validators.required, Validators.email]],
                firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
                lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
                phone_number: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
                fax: ['', Validators.pattern(/^\d{8}$/)],
                address: ['', Validators.required],
                gender: ['', Validators.required]
              });
            }
  
  ngOnInit(): void {
    this.clientForm.patchValue(this.data);
  }

  get companyname() {
    return this.clientForm.get('companyname');
  }

  get email() {
    return this.clientForm.get('email');
  }

  get firstname() {
    return this.clientForm.get('firstname');
  }

  get lastname() {
    return this.clientForm.get('lastname');
  }

  get phone_number() {
    return this.clientForm.get('phone_number');
  }

  get fax() {
    return this.clientForm.get('fax');
  }

  get gender() : FormControl{
    return this.clientForm.get('gender') as FormControl;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.clientForm.valid) {
      if(this.data){
        this.clientService.updateClient(this.data.id,this.clientForm.value).subscribe({
          next : (res) => {
            this._successMessage.openSnackBar("Client Updated!", "done");
            console.log(res);
            this._dialogRef.close(true);
          },
          error : (err) => {
            console.log(err)
          }
        });
      }
      else {
      this.clientService.addClient(this.clientForm.value).subscribe({
        next:(val : any)=>{
          this._successMessage.openSnackBar("Client added!", "done");
          this._dialogRef.close(true);
        },
        error:(err :any)=>{
          console.log(err)
        }
      })

    }
  }
  }
}
