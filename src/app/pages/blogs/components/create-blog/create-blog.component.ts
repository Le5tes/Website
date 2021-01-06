import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  @Output() createBlog = new EventEmitter<Blog>();
  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  postBlog() {
    this.createBlog.emit(new Blog())
    this.close.emit(true);
  }
}
