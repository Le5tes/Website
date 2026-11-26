import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  constructor(
    private securityService: OidcSecurityService,
    private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.securityService.checkAuth().subscribe(({ isAuthenticated }) => {
      if (isAuthenticated) {
        this.navigationService.goto('blog');
      } else {
        this.securityService.authorize();
      }
    });
  }
}
