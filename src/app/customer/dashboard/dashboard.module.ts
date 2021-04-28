import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgxDatePickerModule } from '@ngx-tiny/date-picker';
import { DataTablesModule } from "angular-datatables";
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxPayPalModule } from 'ngx-paypal';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfileComponent } from '../profile/profile.component';
import { EventsComponent } from '../events/events.component';
import { EventRequestComponent } from '../event-request/event-request.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ToNumberPipe } from './number.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    EventsComponent,
    EventRequestComponent,
    RequestDetailsComponent,
    ToNumberPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgxDatePickerModule,
    DataTablesModule,
    GoogleMapsModule,
    NgxPayPalModule
  ]
})
export class DashboardModule { }
