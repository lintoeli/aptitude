import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleaseFreqDetailsPage } from './release-freq-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReleaseFreqDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleaseFreqDetailsPageRoutingModule {}
