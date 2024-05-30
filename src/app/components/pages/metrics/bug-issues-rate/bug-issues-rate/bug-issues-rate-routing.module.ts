import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BugIssuesRatePage } from './bug-issues-rate.page';

const routes: Routes = [
  {
    path: '',
    component: BugIssuesRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BugIssuesRatePageRoutingModule {}
