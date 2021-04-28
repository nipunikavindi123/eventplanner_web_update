import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    RequestDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    GoogleMapsModule
  ]
})
export class DashboardModule { }
