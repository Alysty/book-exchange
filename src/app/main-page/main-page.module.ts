import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './main-page-routing.module';

import { MainPagePage } from './main-page.page';
import {BookCardPageModule} from '../book-card/book-card.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FolderPageRoutingModule,
        BookCardPageModule
    ],
  declarations: [MainPagePage]
})
export class FolderPageModule {}
