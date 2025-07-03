import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Blog } from '../../models/blog.model';
import { BlogsService } from '../../services/blogs.service';

@Component({
  selector: 'app-blog-by-id',
  templateUrl: './blog-by-id.component.html',
  styleUrls: ['./blog-by-id.component.scss'],
  standalone: false
})
export class BlogByIdComponent implements OnInit {
  blog: Blog

  constructor(public blogsService: BlogsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap(params => this.blogsService.getBlogById(params["blogId"]))
      ).subscribe(blog => this.blog = blog)
  }

}
