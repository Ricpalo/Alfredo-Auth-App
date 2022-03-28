import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUbicacionPageRoutingModule } from './update-ubicacion-routing.module';

import { UpdateUbicacionPage } from './update-ubicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUbicacionPageRoutingModule
  ],
  declarations: [UpdateUbicacionPage]
})
export class UpdateUbicacionPageModule {}
