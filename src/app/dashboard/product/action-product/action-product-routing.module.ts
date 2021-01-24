import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionProductPage } from './action-product.page';

const routes: Routes = [
  {
    path: '',
    component: ActionProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionProductPageRoutingModule {}
