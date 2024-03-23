import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProjectCardListComponent } from './project-card-list.component';
import { HomePageRoutingModule } from '../../pages/home/home-routing.module';

@NgModule({
    declarations: [
        ProjectCardListComponent // Declara tu componente aquí
    ],
    imports: [
      CommonModule,
      HomePageRoutingModule,
      IonicModule // Importa IonicModule para usar componentes de Ionic
    ],
    exports: [
        ProjectCardListComponent // Exporta tu componente para que pueda ser utilizado en otros lugares
    ]
  })
  export class ProjectCardListModule { }