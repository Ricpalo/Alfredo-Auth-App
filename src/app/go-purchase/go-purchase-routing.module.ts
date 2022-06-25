import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoPurchasePage } from './go-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: GoPurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoPurchasePageRoutingModule {}
