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
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './pages/login/login.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({ 
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BlogsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    LandingModule,
    GamesModule,
    LoginModule,
    ProjectsModule,
    SlideSelectorModule,
    AboutModule,
    AuthConfigModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
