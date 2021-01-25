import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionProductPageRoutingModule } from './action-product-routing.module';

import { ActionProductPage } from './action-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ActionProductPageRoutingModule
  ],
  declarations: [ActionProductPage]
})
export class ActionProductPageModule {}
