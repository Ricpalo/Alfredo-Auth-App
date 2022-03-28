import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUbicacionPage } from './add-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: AddUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUbicacionPageRoutingModule {}
