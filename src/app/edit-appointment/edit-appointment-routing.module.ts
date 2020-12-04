import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAppointmentPage } from './edit-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: EditAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAppointmentPageRoutingModule {}
