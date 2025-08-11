import { CommonModule } from "@angular/common";
import { ImagePipe } from "./pipes/image.pipe";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [ImagePipe],
  imports: [
    CommonModule
  ],
  exports: [ImagePipe]
})
export class ImagePipeModule { }