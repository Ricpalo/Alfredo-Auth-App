import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosVendedorPage } from './productos-vendedor.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosVendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosVendedorPageRoutingModule {}
