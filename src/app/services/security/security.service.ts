import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  loginUrl
  currentUserUrl

  constructor(private http: HttpClient) { 
    this.loginUrl = environment.blogUrl + '/users/login';
    this.currentUserUrl = environment.blogUrl + '/users/loggedIn';
  }

  login( username, password) {
    return this.http.post(this.loginUrl, {username: username, password: password}, {withCredentials: true});
  }

  getCurrentUser() {
    return this.http.get(this.currentUserUrl, {withCredentials: true}).pipe(catchError(err => of(null)));
  }
}
