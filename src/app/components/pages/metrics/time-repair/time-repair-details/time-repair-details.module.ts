import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeRepairDetailsPageRoutingModule } from './time-repair-details-routing.module';

import { TimeRepairDetailsPage } from './time-repair-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';
import { DashboardModule } from 'src/app/components/shared/dashboard/dashboard.component.module';
import { MetricMenuModule } from 'src/app/components/shared/metric-menu/metric-menu.module';
import { ChartComponent } from 'src/app/components/shared/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeRepairDetailsPageRoutingModule,
    HeaderModule,
    DashboardModule,
    MetricMenuModule,
    ChartComponent
  ],
  declarations: [TimeRepairDetailsPage]
})
export class TimeRepairDetailsPageModule {}
