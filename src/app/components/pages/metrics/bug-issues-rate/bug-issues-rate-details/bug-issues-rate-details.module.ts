import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BugIssuesRateDetailsPageRoutingModule } from './bug-issues-rate-details-routing.module';

import { BugIssuesRateDetailsPage } from './bug-issues-rate-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';
import { MetricMenuModule } from 'src/app/components/shared/metric-menu/metric-menu.module';
import { DashboardModule } from 'src/app/components/shared/dashboard/dashboard.component.module';
import { ChartComponent } from 'src/app/components/shared/chart/chart.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BugIssuesRateDetailsPageRoutingModule,
    HeaderModule,
    DashboardModule,
    MetricMenuModule,
    ChartComponent,
    PipesModule
  ],
  declarations: [BugIssuesRateDetailsPage]
})
export class BugIssuesRateDetailsPageModule {}
