import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './main-page-routing.module';

import { MainPagePage } from './main-page.page';
import {MyBooksPageModule} from '../my-books/my-books.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FolderPageRoutingModule,
        MyBooksPageModule
    ],
  declarations: [MainPagePage]
})
export class FolderPageModule {}
