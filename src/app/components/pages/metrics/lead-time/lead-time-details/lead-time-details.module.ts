import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadTimeDetailsPageRoutingModule } from './lead-time-details-routing.module';

import { LeadTimeDetailsPage } from './lead-time-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';
import { DashboardModule } from 'src/app/components/shared/dashboard/dashboard.component.module';
import { MetricMenuModule } from 'src/app/components/shared/metric-menu/metric-menu.module';
import { ChartComponent } from 'src/app/components/shared/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadTimeDetailsPageRoutingModule,
    HeaderModule,
    DashboardModule,
    MetricMenuModule,
    ChartComponent
  ],
  declarations: [LeadTimeDetailsPage]
})
export class LeadTimeDetailsPageModule {}
