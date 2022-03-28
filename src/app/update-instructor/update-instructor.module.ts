import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateInstructorPageRoutingModule } from './update-instructor-routing.module';

import { UpdateInstructorPage } from './update-instructor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateInstructorPageRoutingModule
  ],
  declarations: [UpdateInstructorPage]
})
export class UpdateInstructorPageModule {}
