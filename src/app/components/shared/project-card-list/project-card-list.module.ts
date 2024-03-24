import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProjectCardListComponent } from './project-card-list.component';
import { HomePageRoutingModule } from '../../pages/home/home-routing.module';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [
        ProjectCardListComponent
    ],
    imports: [
      CommonModule,
      HomePageRoutingModule,
      IonicModule,
      PipesModule
    ],
    exports: [
        ProjectCardListComponent 
    ]
  })
  export class ProjectCardListModule { }