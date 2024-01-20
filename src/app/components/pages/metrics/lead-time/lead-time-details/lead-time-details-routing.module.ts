import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadTimeDetailsPage } from './lead-time-details.page';

const routes: Routes = [
  {
    path: '',
    component: LeadTimeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadTimeDetailsPageRoutingModule {}
