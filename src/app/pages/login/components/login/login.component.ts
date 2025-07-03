import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SecurityService } from 'src/app/services/security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  form;
  authenticationError = false;
  serviceError = false;

  constructor(
    public securityService: SecurityService, 
    public navigationService: NavigationService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.securityService.getCurrentUser().subscribe((value) => {
      if (value) {
        this.navigationService.goto('');
      }
    });

    this.form = this.fb.group({
      username: [],
      password: []
    });
  }

  login() {
    this.authenticationError = false;
    this.serviceError = false;
    this.securityService.login(this.username, this.password).subscribe(
      () => {
        this.navigationService.goto('');
      }, 
      (err) => {
        if (err.status == 401) {
          this.authenticationError = true;
        } else {
          this.serviceError = true;
        }
      }
    )
  }

  private get username() { return this.form.get('username').value}
  private get password() { return this.form.get('password').value}
}
