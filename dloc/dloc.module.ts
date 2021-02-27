import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DlocPageRoutingModule } from './dloc-routing.module';

import { DlocPage } from './dloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DlocPageRoutingModule
  ],
  declarations: [DlocPage]
})
export class DlocPageModule {}
