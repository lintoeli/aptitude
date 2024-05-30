import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeRepairPage } from './time-repair.page';

const routes: Routes = [
  {
    path: '',
    component: TimeRepairPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeRepairPageRoutingModule {}
