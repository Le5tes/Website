import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './components/blogs.component';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  declarations: [BlogsComponent, BlogComponent],
  imports: [
    CommonModule
  ]
})
export class BlogsModule { }
