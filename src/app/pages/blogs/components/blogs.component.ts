import { Component, OnInit } from '@angular/core';
// import { SecurityService } from 'src/app/services/security/security.service';
import { BlogsService } from '../services/blogs.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  standalone: false
})
export class BlogsComponent implements OnInit {
  blogs;
  loggedIn;
  creatingBlog = false;

  constructor(public blogsService: BlogsService, public securityService: OidcSecurityService) { }

  ngOnInit(): void {
    // this.securityService.getCurrentUser().subscribe((loggedIn) => this.loggedIn = loggedIn); 
    this.securityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken, configId }) => {
      if (isAuthenticated) {
        this.loggedIn = userData['preferred_username']
      }
    })
    this.blogsService.getBlogs().subscribe((blogs) => this.blogs = blogs.map((blog) => {
      blog.createdAt = new Date(blog.createdAt);
      return blog;
    }).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }

  newBlog() {
    this.creatingBlog = true;
  }

  stopCreatingBlog() {
    this.creatingBlog = false;
  }

  uploadBlog(event) {
    this.blogsService.postBlog(event).subscribe();
  }
}
