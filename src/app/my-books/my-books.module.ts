import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBooksPageRoutingModule } from './my-books-routing.module';

import { MyBooksComponent } from './my-books.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBooksPageRoutingModule
  ],
  exports: [
    MyBooksComponent
  ],
  declarations: [MyBooksComponent]
})
export class MyBooksPageModule {}
