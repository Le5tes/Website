import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security/security.service';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs;
  loggedIn;
  creatingBlog = false;

  constructor(public blogsService: BlogsService, public securityService: SecurityService) { }

  ngOnInit(): void {
    this.securityService.getCurrentUser().subscribe((loggedIn) => this.loggedIn = loggedIn); 
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
