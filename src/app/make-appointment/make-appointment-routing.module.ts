import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeAppointmentPage } from './make-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: MakeAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeAppointmentPageRoutingModule {}
