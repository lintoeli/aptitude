import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./components/shared/header/header.component').then( m => m.HeaderComponent)
  },
  {
    path: 'release-freq',
    loadChildren: () => import('./components/pages/metrics/release-freq/release-freq/release-freq.module').then( m => m.ReleaseFreqPageModule)
  },
  {
    path: 'release-freq/:project',
    loadChildren: () => import('./components/pages/metrics/release-freq/release-freq-details/release-freq-details.module').then( m => m.ReleaseFreqDetailsPageModule)
  },
  {
    path: 'lead-time',
    loadChildren: () => import('./components/pages/metrics/lead-time/lead-time/lead-time.module').then( m => m.LeadTimePageModule)
  },
  {
    path: 'lead-time/:project',
    loadChildren: () => import('./components/pages/metrics/lead-time/lead-time-details/lead-time-details.module').then( m => m.LeadTimeDetailsPageModule)
  },
  {
    path: 'time-repair',
    loadChildren: () => import('./components/pages/metrics/time-repair/time-repair/time-repair.module').then( m => m.TimeRepairPageModule)
  },
  {
    path: 'time-repair/:project',
    loadChildren: () => import('./components/pages/metrics/time-repair/time-repair-details/time-repair-details.module').then( m => m.TimeRepairDetailsPageModule)
  },
  {
    path: 'bug-issues-rate',
    loadChildren: () => import('./components/pages/metrics/bug-issues-rate/bug-issues-rate/bug-issues-rate.module').then( m => m.BugIssuesRatePageModule)
  },
  {
    path: 'bug-issues-rate/:project',
    loadChildren: () => import('./components/pages/metrics/bug-issues-rate/bug-issues-rate-details/bug-issues-rate-details.module').then( m => m.BugIssuesRateDetailsPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
