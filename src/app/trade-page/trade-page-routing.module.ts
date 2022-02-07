import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradePagePage } from './trade-page.page';

const routes: Routes = [
  {
    path: '',
    component: TradePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradePagePageRoutingModule {}
