import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TradePagePageRoutingModule } from './trade-page-routing.module';

import { TradePagePage } from './trade-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TradePagePageRoutingModule
  ],
  declarations: [TradePagePage]
})
export class TradePagePageModule {}
