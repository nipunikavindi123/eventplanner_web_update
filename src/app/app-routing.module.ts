import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 

import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogComponent } from './blog/blog.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { DecorationComponent } from './decoration/decoration.component';
import { EntertainingComponent } from './entertaining/entertaining.component';
import { HomeComponent } from './home/home.component';
import { HospitalityComponent } from './hospitality/hospitality.component';
import { LoginComponent } from './login/login.component';
import { PhotographyComponent } from './photography/photography.component';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { SupprofileComponent } from './supprofile/supprofile.component';
import { TransportationComponent } from './transportation/transportation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from './utl/auth.guard';
import { RoleGuard } from './utl/role.guard';
import { RegistrationGuard } from './utl/registration.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'Login', 
    component: LoginComponent,
    canActivate: [RegistrationGuard],
  },
  {
    path: 'Blog', 
    component: BlogComponent
  },
  {
    path: 'Blog/Page', 
    component: BlogHomeComponent
  },
  {
    path: 'SupplierRegistration', 
    component: SupplierRegistrationComponent,
    canActivate: [RegistrationGuard],
  },
  {
    path: 'CustomerRegistration', 
    component: CustomerRegistrationComponent,
    canActivate: [RegistrationGuard],
  },
  {
    path:'userprofile', 
    component:UserProfileComponent
  },
  {
    path:'supprofile', 
    component:SupprofileComponent
  },
  {
    path:'hospitality', 
    component:HospitalityComponent
  },
  {
    path:'entertaining', 
    component:EntertainingComponent
  },
  {
    path:'transportation', 
    component:TransportationComponent
  },
  {
    path:'decoration', 
    component:DecorationComponent
  },
  {
    path:'photography', 
    component:PhotographyComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/dashboard/dashboard.module').then( m => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      allowedRoles: ['customer']
    }
  },
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/dashboard/dashboard.module').then( m => m.DashboardModule),
    canActivate: [AuthGuard,  RoleGuard],
    data: {
      allowedRoles: ['supplier']
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/dashboard/dashboard.module').then( m => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      allowedRoles: ['admin']
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
