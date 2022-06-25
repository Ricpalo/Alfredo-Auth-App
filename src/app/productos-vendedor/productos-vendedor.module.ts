import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosVendedorPageRoutingModule } from './productos-vendedor-routing.module';

import { ProductosVendedorPage } from './productos-vendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosVendedorPageRoutingModule
  ],
  declarations: [ProductosVendedorPage]
})
export class ProductosVendedorPageModule {}
