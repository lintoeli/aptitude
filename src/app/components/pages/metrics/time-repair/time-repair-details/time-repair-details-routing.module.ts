import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeRepairDetailsPage } from './time-repair-details.page';

const routes: Routes = [
  {
    path: '',
    component: TimeRepairDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeRepairDetailsPageRoutingModule {}
