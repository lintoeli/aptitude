import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeRepairPageRoutingModule } from './time-repair-routing.module';

import { TimeRepairPage } from './time-repair.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeRepairPageRoutingModule,
    HeaderModule
  ],
  declarations: [TimeRepairPage]
})
export class TimeRepairPageModule {}
