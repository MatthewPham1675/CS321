import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpandPageRoutingModule } from './expand-routing.module';

import { ExpandPage } from './expand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpandPageRoutingModule
  ],
  declarations: [ExpandPage]
})
export class ExpandPageModule {}
