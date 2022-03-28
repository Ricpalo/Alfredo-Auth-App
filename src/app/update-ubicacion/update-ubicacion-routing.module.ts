import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUbicacionPage } from './update-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUbicacionPageRoutingModule {}
