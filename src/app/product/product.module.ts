import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductPage
      }
    ])
  ],
  declarations: [ProductPage],
  entryComponents: [],
  exports: [ProductPage]
})
export class ProductPageModule {}
