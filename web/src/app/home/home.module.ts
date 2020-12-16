import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from '../shared/icon/icon.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, IconComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
