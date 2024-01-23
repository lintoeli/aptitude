import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadTimePageRoutingModule } from './lead-time-routing.module';

import { LeadTimePage } from './lead-time.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadTimePageRoutingModule,
    HeaderModule
  ],
  declarations: [LeadTimePage]
})
export class LeadTimePageModule {}
