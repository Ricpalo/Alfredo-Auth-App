import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoPurchasePageRoutingModule } from './go-purchase-routing.module';

import { GoPurchasePage } from './go-purchase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoPurchasePageRoutingModule
  ],
  declarations: [GoPurchasePage]
})
export class GoPurchasePageModule {}
