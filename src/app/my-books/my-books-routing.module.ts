import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBooksComponent } from './my-books.component';

const routes: Routes = [
  {
    path: '',
    component: MyBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBooksPageRoutingModule {}
