import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http2ServerRequest } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  loginUrl

  constructor(private http: HttpClient) { }

  login( username, password) {
    return this.http.post(this.loginUrl, {username: username, password: password});
  }
}
