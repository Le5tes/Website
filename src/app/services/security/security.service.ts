import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http2ServerRequest } from 'http2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  loginUrl
  currentUserUrl

  constructor(private http: HttpClient) { }

  login( username, password) {
    return this.http.post(this.loginUrl, {username: username, password: password});
  }

  getCurrentUser() {
    return this.http.get(this.currentUserUrl).pipe(catchError(err => of(null)));
  }
}
