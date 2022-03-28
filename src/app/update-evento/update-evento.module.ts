import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEventoPageRoutingModule } from './update-evento-routing.module';

import { UpdateEventoPage } from './update-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateEventoPageRoutingModule
  ],
  declarations: [UpdateEventoPage]
})
export class UpdateEventoPageModule {}
