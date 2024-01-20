import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadTimeDetailsPageRoutingModule } from './lead-time-details-routing.module';

import { LeadTimeDetailsPage } from './lead-time-details.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadTimeDetailsPageRoutingModule,
    HeaderModule
  ],
  declarations: [LeadTimeDetailsPage]
})
export class LeadTimeDetailsPageModule {}
