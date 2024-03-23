import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';


import { HomePage } from './home.page';
import { HeaderModule } from '../../shared/header/header.module';
import { ProjectCardListModule } from '../../shared/project-card-list/project-card-list.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    ProjectCardListModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
