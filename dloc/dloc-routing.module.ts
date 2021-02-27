import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DlocPage } from './dloc.page';

const routes: Routes = [
  {
    path: '',
    component: DlocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DlocPageRoutingModule {}
