import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { BlogsService } from 'src/app/pages/blogs/services/blogs.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  standalone: false
})
export class ProjectComponent {
  items
  constructor(public blogsService: BlogsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap(params => this.blogsService.getBlogs())
      ).subscribe(items => this.items = items.map((item) => ({...item, url: `/blogs/${item.id}`}) ))
  }

}
