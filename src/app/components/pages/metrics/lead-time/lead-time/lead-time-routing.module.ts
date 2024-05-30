import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadTimePage } from './lead-time.page';

const routes: Routes = [
  {
    path: '',
    component: LeadTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadTimePageRoutingModule {}
