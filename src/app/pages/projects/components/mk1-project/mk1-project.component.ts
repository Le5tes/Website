import { Component } from '@angular/core';
import { BlogsService } from 'src/app/pages/blogs/services/blogs.service';

@Component({
  selector: 'app-mk1-project',
  templateUrl: './mk1-project.component.html',
  styleUrl: './mk1-project.component.scss',
  standalone: false
})
export class MK1ProjectComponent {
  items
  constructor(public blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blogsService.getBlogs().subscribe(items => this.items = items.map((item) => ({...item, url: `/blogs/${item.id}`}) ))
  }

}
