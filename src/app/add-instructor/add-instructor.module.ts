import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInstructorPageRoutingModule } from './add-instructor-routing.module';

import { AddInstructorPage } from './add-instructor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInstructorPageRoutingModule
  ],
  declarations: [AddInstructorPage]
})
export class AddInstructorPageModule {}
