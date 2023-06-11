import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployersComponent } from './employers/employers.component';
import { ClientsComponent } from './clients/clients.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { AddEmployerComponent } from './employers/add-employer/add-employer.component';
import { ErrorComponentComponent } from './error-component/error-component.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EmployersComponent,
    ClientsComponent,
    AddClientComponent,
    DeleteConfirmationComponent,
    AddEmployerComponent,
    ErrorComponentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    
    
    
  ]
})
export class AdminModule { }
