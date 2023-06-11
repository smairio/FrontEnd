import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Core-Module/login/login.component';
import { NotFountComponent } from './Core-Module/not-fount/not-fount.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path : "", redirectTo:'login' , pathMatch:"full"},
  {path : "login", component:LoginComponent},
  {path : "admin",canActivate : [AuthGuard], loadChildren : ()=> import ('./admin/admin.module').then((m) =>m.AdminModule)},
  {path : "user", loadChildren : ()=> import ('./user/user.module').then((m) =>m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
