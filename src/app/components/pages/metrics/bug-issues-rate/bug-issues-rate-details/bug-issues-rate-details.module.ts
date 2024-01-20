import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BugIssuesRateDetailsPageRoutingModule } from './bug-issues-rate-details-routing.module';

import { BugIssuesRateDetailsPage } from './bug-issues-rate-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BugIssuesRateDetailsPageRoutingModule,
    HeaderModule
  ],
  declarations: [BugIssuesRateDetailsPage]
})
export class BugIssuesRateDetailsPageModule {}
