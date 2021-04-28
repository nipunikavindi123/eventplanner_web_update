import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { EventsComponent } from '../events/events.component';
import { EventRequestComponent } from '../event-request/event-request.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';

import { OrderResolver } from '../../utl/order.resolver';
import { RequestResolver } from '../../utl/request.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'event-request/:id',
    component: EventRequestComponent,
    resolve: { supplier: RequestResolver }
  },
  {
    path: 'request-details/:id',
    component: RequestDetailsComponent,
    resolve: { order: OrderResolver }
  },
  {
    path: '',
    redirectTo : 'profile',
    pathMatch : 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    OrderResolver,
    RequestResolver
  ]
})

export class DashboardRoutingModule {}
