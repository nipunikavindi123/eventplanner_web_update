import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsersComponent } from '../users/users.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';
import { InquiriesComponent } from '../inquiries/inquiries.component';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    UpdateUserComponent,
    RequestDetailsComponent,
    InquiriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DataTablesModule,
    SweetAlert2Module.forRoot()
  ]
})
export class DashboardModule { }
