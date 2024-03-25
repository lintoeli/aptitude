import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleaseFreqDetailsPageRoutingModule } from './release-freq-details-routing.module';

import { ReleaseFreqDetailsPage } from './release-freq-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';
import { DashboardModule } from 'src/app/components/shared/dashboard/dashboard.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleaseFreqDetailsPageRoutingModule,
    HeaderModule,
    DashboardModule
  ],
  declarations: [ReleaseFreqDetailsPage]
})
export class ReleaseFreqDetailsPageModule {}
