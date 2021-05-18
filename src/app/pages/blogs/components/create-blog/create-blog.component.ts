import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  @Output() createBlog = new EventEmitter();
  @Output() closeComponent = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({blog: []})
  }

  postBlog() {
    this.createBlog.emit(this.form.value)
    this.closeBlog();
  }
  
  closeBlog() {
    this.closeComponent.emit(true);
  }

  get previewBlog() {
    return Object.assign({username: "Bob"}, this.form.value);
  }
}
