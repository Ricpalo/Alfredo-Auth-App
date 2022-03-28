import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAlumnoPageRoutingModule } from './update-alumno-routing.module';

import { UpdateAlumnoPage } from './update-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAlumnoPageRoutingModule
  ],
  declarations: [UpdateAlumnoPage]
})
export class UpdateAlumnoPageModule {}
