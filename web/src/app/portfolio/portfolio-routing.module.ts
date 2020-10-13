import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [
  {
    path: 'portfolio',
    component: PortfolioComponent,
    pathMatch: 'full'
  },
  {
    path: 'acerca-de',
    component: PortfolioComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
