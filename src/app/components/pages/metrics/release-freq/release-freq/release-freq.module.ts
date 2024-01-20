import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleaseFreqPageRoutingModule } from './release-freq-routing.module';

import { ReleaseFreqPage } from './release-freq.page';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleaseFreqPageRoutingModule,
    HeaderModule
  ],
  declarations: [ReleaseFreqPage]
})
export class ReleaseFreqPageModule {}
