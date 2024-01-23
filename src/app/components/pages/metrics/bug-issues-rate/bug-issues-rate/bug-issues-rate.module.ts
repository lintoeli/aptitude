import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BugIssuesRatePageRoutingModule } from './bug-issues-rate-routing.module';

import { BugIssuesRatePage } from './bug-issues-rate.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BugIssuesRatePageRoutingModule,
    HeaderModule
  ],
  declarations: [BugIssuesRatePage]
})
export class BugIssuesRatePageModule {}
