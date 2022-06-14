import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './components/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './components/upload/upload.component';
import { ImagePipe } from './pipes/image.pipe';
import { BlogByIdComponent } from './components/blog-by-id/blog-by-id.component';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';

@NgModule({
  declarations: [BlogsComponent, BlogComponent, CreateBlogComponent, UploadComponent, ImagePipe, BlogByIdComponent],
  imports: [
    HttpClientModule,
    SlideSelectorModule,
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot()
  ]
})
export class BlogsModule { }
