import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './components/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './components/upload/upload.component';
import { BlogByIdComponent } from './components/blog-by-id/blog-by-id.component';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';
import { ImagePipeModule } from 'src/modules/image-pipe/image-pipe.module';

@NgModule({
  declarations: [BlogsComponent, BlogComponent, CreateBlogComponent, UploadComponent, BlogByIdComponent],
  imports: [
    SlideSelectorModule,
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    ImagePipeModule
  ], 
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class BlogsModule { }
