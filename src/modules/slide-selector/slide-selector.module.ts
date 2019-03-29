import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideSelectorComponent } from './components/slide-selector/slide-selector.component';

@NgModule({
  declarations: [SlideSelectorComponent],
  imports: [
    CommonModule
  ],
  exports: [SlideSelectorComponent]
})
export class SlideSelectorModule { }
