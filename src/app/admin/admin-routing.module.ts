import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployersComponent } from './employers/employers.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent} from "./projects/projects.component";

const routes: Routes = [
  {path:"",component:DashboardComponent,children:[
    {path:"employers",component:EmployersComponent},
    {path:"clients",component:ClientsComponent},
      {path:"projects",component:ProjectsComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
