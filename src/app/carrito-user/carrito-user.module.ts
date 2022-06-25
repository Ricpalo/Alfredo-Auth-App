import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoUserPageRoutingModule } from './carrito-user-routing.module';

import { CarritoUserPage } from './carrito-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoUserPageRoutingModule
  ],
  declarations: [CarritoUserPage]
})
export class CarritoUserPageModule {}
