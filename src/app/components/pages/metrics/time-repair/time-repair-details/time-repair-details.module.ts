import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeRepairDetailsPageRoutingModule } from './time-repair-details-routing.module';

import { TimeRepairDetailsPage } from './time-repair-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeRepairDetailsPageRoutingModule,
    HeaderModule
  ],
  declarations: [TimeRepairDetailsPage]
})
export class TimeRepairDetailsPageModule {}
