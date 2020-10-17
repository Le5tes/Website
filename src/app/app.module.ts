import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LandingModule } from 'src/pages/landing/landing.module';
import { GamesModule } from 'src/pages/games/games.module';
import { AboutModule } from 'src/pages/about/about.module';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule, 
    LandingModule,
    GamesModule,
    SlideSelectorModule,
    AboutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
