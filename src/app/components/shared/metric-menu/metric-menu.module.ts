import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MetricMenuComponent } from './metric-menu.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],

  exports: [
    MetricMenuComponent
  ],
  declarations: [
    MetricMenuComponent
  ]
})
export class MetricMenuModule {}
