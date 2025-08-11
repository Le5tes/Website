import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideSelectorComponent } from './components/slide-selector/slide-selector.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ImagePipeModule } from '../image-pipe/image-pipe.module';

@NgModule({
  declarations: [SlideSelectorComponent, PreviewComponent],
  imports: [
    CommonModule,
    ImagePipeModule
  ],
  exports: [SlideSelectorComponent, PreviewComponent]
})
export class SlideSelectorModule { }
