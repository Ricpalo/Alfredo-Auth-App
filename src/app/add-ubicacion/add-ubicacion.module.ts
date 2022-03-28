import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUbicacionPageRoutingModule } from './add-ubicacion-routing.module';

import { AddUbicacionPage } from './add-ubicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUbicacionPageRoutingModule
  ],
  declarations: [AddUbicacionPage]
})
export class AddUbicacionPageModule {}
