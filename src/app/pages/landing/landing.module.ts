import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { ViewListModule } from 'src/modules/view-list/view-list.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    ViewListModule
  ]
})
export class LandingModule { }
