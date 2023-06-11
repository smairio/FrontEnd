import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployerService } from 'src/app/service/employer.service';
import { SuccessMessageService } from 'src/app/service/success-message.service';
import { ErrorComponentComponent } from '../../error-component/error-component.component';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent implements OnInit {

  employerForm : FormGroup;
  submitted: boolean = false;
  vPassword : string ='none'

  constructor(private _formBuilder: FormBuilder,
    private _dialog:MatDialog,
    private employerService : EmployerService,
    private _dialogRef:MatDialogRef<AddEmployerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _successMessage : SuccessMessageService,

  ){

    if(!data){
    this.employerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required,this.confirmPasswordValidator]],
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: ['', Validators.required],
      role: ['', Validators.required]
    });
  }else{
    this.employerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: ['', Validators.required],
      role: ['', Validators.required]
    })
  }}

  ngOnInit(): void {
    this.employerForm.patchValue(this.data);
  }

  get username() {
    return this.employerForm.get('username');
  }
  get password() {
    return this.employerForm.get('password');
  }
  get confirm_password () {
    return this.employerForm.get('confirm_password');
  }

  get firstname() {
    return this.employerForm.get('firstname');
  }

  get lastname() {
    return this.employerForm.get('lastname');
  }

  get email() {
    return this.employerForm.get('email');
  }

  get phone_number() {
    return this.employerForm.get('phone_number');
  }

  get address() {
    return this.employerForm.get('address');
  }

  get role() : FormControl{
    return this.employerForm.get('role') as FormControl;
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.employerForm.errors)
    if (this.employerForm.valid) {
      if(this.data){
        this.vPassword='none'
        this.employerService.updateEmployer(this.data.id,this.employerForm.value).subscribe({
          next : (res) => {
            this._successMessage.openSnackBar("Employer Updated!", "done");
            console.log(res);
            this._dialogRef.close(true);
          },
          error : (err) => {
            console.log(err)
            this.openErrorDisplayDialogue(err);
          }
        });
      }
      else {
      this.employerService.addEmployer(this.employerForm.value).subscribe({
        next:(val : any)=>{
          this._successMessage.openSnackBar("Employer added!", "done");
          this._dialogRef.close(true);
        },
        error:(err :any)=>{
          console.log(err);
          this.openErrorDisplayDialogue(err);
      }})
    }
  }
  }

  confirmPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;

    if (password && confirmPassword !== password.value) {
      return { 'mismatch': true };
    }

    return null;
  }

  openErrorDisplayDialogue(data: any) {
    const dialogRef = this._dialog.open(ErrorComponentComponent,{
      data : data
    });
  
  
}}
