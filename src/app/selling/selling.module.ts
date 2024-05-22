import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellingPageRoutingModule } from './selling-routing.module';

import { SellingPage } from './selling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellingPageRoutingModule
  ],
  declarations: [SellingPage]
})
export class SellingPageModule {}
