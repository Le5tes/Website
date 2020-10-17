import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lestes-tech';

  constructor(public router: Router) {

  }

  navigateTo(path) {
    this.router.navigate([path])
  }
}
