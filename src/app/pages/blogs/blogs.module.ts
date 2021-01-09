import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './components/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';

@NgModule({
  declarations: [BlogsComponent, BlogComponent, CreateBlogComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    MarkdownModule.forRoot()
  ]
})
export class BlogsModule { }