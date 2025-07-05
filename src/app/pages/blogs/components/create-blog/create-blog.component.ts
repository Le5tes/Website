import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
  standalone: false
})
export class CreateBlogComponent implements OnInit {
  @Output() createBlog = new EventEmitter();
  @Output() closeComponent = new EventEmitter<boolean>();
  form: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [],
      description: [],
      image: [],
      body: [],
      tags: []
    });
  }

  postBlog() {
    this.createBlog.emit(this.form.value as Blog)
    this.closeBlog();
  }
  
  closeBlog() {
    this.closeComponent.emit(true);
  }

  get previewBlog() {
    return {username: "Bob", ...this.form.value} as Blog;
  }
}
