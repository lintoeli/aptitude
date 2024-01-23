import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseFreqDetailsPageModule } from '../../pages/metrics/release-freq/release-freq-details/release-freq-details.module';
import { LeadTimeDetailsPageModule } from '../../pages/metrics/lead-time/lead-time-details/lead-time-details.module';
import { TimeRepairDetailsPageModule } from '../../pages/metrics/time-repair/time-repair-details/time-repair-details.module';
import { BugIssuesRateDetailsPageModule } from '../../pages/metrics/bug-issues-rate/bug-issues-rate-details/bug-issues-rate-details.module';
import { MetricMenuComponent } from './metric-menu.component';

const routes: Routes = [
    {
        path: '',
        component : MetricMenuComponent,
        children:[
            {
                path: 'release-freq/:project',
                component: ReleaseFreqDetailsPageModule
            },
            {
                path: 'lead-time/:project',
                component: LeadTimeDetailsPageModule
            },
            {
                path: 'time-repair/:project',
                component: TimeRepairDetailsPageModule
            },
            {
                path: 'bug-issues-rate/:project',
                component: BugIssuesRateDetailsPageModule
            },
        ]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MetricMenuComponentRoutingModule {}
