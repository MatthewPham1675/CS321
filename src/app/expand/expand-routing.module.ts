import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpandPage } from './expand.page';

const routes: Routes = [
  {
    path: '',
    component: ExpandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpandPageRoutingModule {}
