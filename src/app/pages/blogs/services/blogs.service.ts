import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  getBlogsUrl: string;

  constructor(public http: HttpClient) {
    this.getBlogsUrl = environment.blogUrl + '/bloggs'
  }

  getBlogs (): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.getBlogsUrl);
  }

  postBlog(blog: Blog) {
    return this.http.post(this.getBlogsUrl, blog);
  }
}
