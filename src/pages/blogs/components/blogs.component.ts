import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs;

  constructor(public blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blogsService.getBlogs().subscribe((blogs) => this.blogs = blogs);
  }
}
