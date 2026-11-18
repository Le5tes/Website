import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  standalone: false
})
export class BlogComponent implements OnInit {
  @Input() blog: Blog;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  getDate() {
    return this.blog.createdAt?.toString() || 'unknown';
  }

  // Keep the first image eager (it is usually above the fold); lazy-load the rest.
  onMarkdownReady() {
    const images = this.elementRef.nativeElement.querySelectorAll('img');
    images.forEach((img, index) => {
      img.decoding = 'async';
      img.loading = index === 0 ? 'eager' : 'lazy';
    });
  }

  get blogText() {
    return this.blog.body;
  }
}
