import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BugIssuesRateDetailsPage } from './bug-issues-rate-details.page';

const routes: Routes = [
  {
    path: '',
    component: BugIssuesRateDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BugIssuesRateDetailsPageRoutingModule {}
