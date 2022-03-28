import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateInstructorPage } from './update-instructor.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateInstructorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateInstructorPageRoutingModule {}
