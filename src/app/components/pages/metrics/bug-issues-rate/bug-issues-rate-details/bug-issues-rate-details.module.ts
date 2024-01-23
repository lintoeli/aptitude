import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BugIssuesRateDetailsPageRoutingModule } from './bug-issues-rate-details-routing.module';

import { BugIssuesRateDetailsPage } from './bug-issues-rate-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';
import { MetricMenuModule } from 'src/app/components/shared/metric-menu/metric-menu.module';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BugIssuesRateDetailsPageRoutingModule,
    HeaderModule,
  ],
  declarations: [BugIssuesRateDetailsPage]
})
export class BugIssuesRateDetailsPageModule implements OnInit{
  project?: String;

  constructor(private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.project = this.route.snapshot.params['project'];
  }
}
