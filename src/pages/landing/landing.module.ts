import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    SlideSelectorModule
  ]
})
export class LandingModule { }
