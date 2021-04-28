import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WebFooterComponent } from './web-footer/web-footer.component';
import { BlogComponent } from './blog/blog.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupprofileComponent } from './supprofile/supprofile.component';
import { HospitalityComponent } from './hospitality/hospitality.component';
import { EntertainingComponent } from './entertaining/entertaining.component';
import { TransportationComponent } from './transportation/transportation.component';
import { DecorationComponent } from './decoration/decoration.component';
import { PhotographyComponent } from './photography/photography.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '../app/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    WebFooterComponent,
    BlogComponent,
    BlogHomeComponent,
    SupplierRegistrationComponent,
    CustomerRegistrationComponent,
    UserProfileComponent,
    SupprofileComponent,
    HospitalityComponent,
    EntertainingComponent,
    TransportationComponent,
    DecorationComponent,
    PhotographyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    GoogleMapsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
