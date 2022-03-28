import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateEventoPage } from './update-evento.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateEventoPageRoutingModule {}
