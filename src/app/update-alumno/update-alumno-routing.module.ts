import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAlumnoPage } from './update-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAlumnoPageRoutingModule {}
