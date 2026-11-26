import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ImagePrefetchService } from '../services/image-prefetch.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  standalone: false
})
export class BlogsComponent implements OnInit {
  blogs;
  loggedIn = false;
  creatingBlog = false;

  constructor(public blogsService: BlogsService, public securityService: OidcSecurityService, private imagePrefetchService: ImagePrefetchService) { }

  ngOnInit(): void {
    this.securityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.loggedIn = isAuthenticated;
    })
    this.loadBlogs();
  }

  private loadBlogs() {
    this.blogsService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs.map((blog) => {
        blog.createdAt = new Date(blog.createdAt);
        return blog;
      }).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.imagePrefetchService.prefetchBlogs(this.blogs);
    });
  }

  newBlog() {
    this.creatingBlog = true;
  }

  stopCreatingBlog() {
    this.creatingBlog = false;
  }

  uploadError = false;

  uploadBlog(event) {
    this.uploadError = false;
    this.blogsService.postBlog(event).subscribe({
      next: () => this.loadBlogs(),
      error: () => this.uploadError = true
    });
  }
}
