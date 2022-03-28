import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInstructorPage } from './add-instructor.page';

const routes: Routes = [
  {
    path: '',
    component: AddInstructorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInstructorPageRoutingModule {}
