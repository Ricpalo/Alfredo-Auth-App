import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoUserPage } from './carrito-user.page';

const routes: Routes = [
  {
    path: '',
    component: CarritoUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritoUserPageRoutingModule {}
