import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LandingModule } from './pages/landing/landing.module';
import { GamesModule } from './pages/games/games.module';
import { AboutModule } from './pages/about/about.module';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';
import { BlogsModule } from './pages/blogs/blogs.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BlogsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule, 
    LandingModule,
    GamesModule,
    SlideSelectorModule,
    AboutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
