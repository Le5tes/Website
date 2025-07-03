import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationService } from './services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'lestes-tech';
  iconOptions: string;
  lightTheme = true

  constructor(
    public navigationService: NavigationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('robot', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/robot-blank.svg'));
    this.iconOptions = this.chooseIconOptions();
  }

  navigateTo(path) {
    this.navigationService.goto(path);
  }

  toggleTheme() {
    this.lightTheme = !this.lightTheme;
  }

  get theme () {
    return this.lightTheme ? 'light-robot-theme' : '';
  }

  private chooseIconOptions () {
    return Math.random() > 0.8 ? 'hide-eye' : 'hide-arm';
  }
}
