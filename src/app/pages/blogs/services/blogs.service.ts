import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  getBlogsUrl: string;

  constructor(public http: HttpClient, private securityService: OidcSecurityService) {
    this.getBlogsUrl = environment.blogUrl + '/blogs';
  }

  getBlogs (): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.getBlogsUrl, {params: {limit: 10}});
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(this.getBlogsUrl + "/" + id);
  }

  postBlog(blog) {
    return this.securityService.getAccessToken().pipe(mergeMap(token => 
      this.http.post(this.getBlogsUrl, blog, {withCredentials: true, headers: {Authorization: 'Bearer ' + token}})
    ))
  }
}
