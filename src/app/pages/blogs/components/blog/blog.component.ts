import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blog: Blog;

  constructor() { }

  ngOnInit(): void {
  }

  getDate() {
    return this.blog.createdAt || 'unknown';
  }
  get blogText() {
    return this.blog.body;
  }
}
