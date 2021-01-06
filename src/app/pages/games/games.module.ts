import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './components/games/games.component';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    SlideSelectorModule
  ]
})
export class GamesModule { }
