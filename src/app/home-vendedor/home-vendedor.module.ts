import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeVendedorPageRoutingModule } from './home-vendedor-routing.module';

import { HomeVendedorPage } from './home-vendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeVendedorPageRoutingModule
  ],
  declarations: [HomeVendedorPage]
})
export class HomeVendedorPageModule {}
