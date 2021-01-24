import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPage } from './product.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  },
  {
    path: 'action-product',
    loadChildren: () => import('./action-product/action-product.module').then( m => m.ActionProductPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
