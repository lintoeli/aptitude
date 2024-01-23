import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponentRoutingModule } from './header-routing.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HeaderComponentRoutingModule
  ],

  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})
export class HeaderModule {}
