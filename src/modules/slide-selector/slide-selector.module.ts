import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideSelectorComponent } from './components/slide-selector/slide-selector.component';
import { PreviewComponent } from './components/preview/preview.component';

@NgModule({
  declarations: [SlideSelectorComponent, PreviewComponent],
  imports: [
    CommonModule
  ],
  exports: [SlideSelectorComponent, PreviewComponent]
})
export class SlideSelectorModule { }
