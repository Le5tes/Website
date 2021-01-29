import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lestes-tech';
  lightTheme = true

  constructor(
      public router: Router, 
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer
    ) {
    this.matIconRegistry.addSvgIcon('robot', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/robot-blank.svg'));
  }

  navigateTo(path) {
    this.router.navigate([path])
  }

  toggleTheme() {
    this.lightTheme = !this.lightTheme;
  }

  get theme () {
    return this.lightTheme ? 'light-robot-theme' : '';
  }
}
