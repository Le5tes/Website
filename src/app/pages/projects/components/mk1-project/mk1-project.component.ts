import { Component } from '@angular/core';
import { BlogsService } from 'src/app/pages/blogs/services/blogs.service';
import { ImagePipe } from 'src/modules/image-pipe/pipes/image.pipe';

@Component({
  selector: 'app-mk1-project',
  templateUrl: './mk1-project.component.html',
  styleUrl: './mk1-project.component.scss',
  standalone: false
})
export class MK1ProjectComponent {
  items
  imagePipe = new ImagePipe()
  constructor(public blogsService: BlogsService) { }

  ngOnInit(): void {
    const blogTolistItem = (item) => ({...item, image: this.imagePipe.transform(item.image), url: `/blogs/${item.id}`})

    this.blogsService.getBlogs()
    .subscribe(items => this.items = items.map(blogTolistItem).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
  }

}
