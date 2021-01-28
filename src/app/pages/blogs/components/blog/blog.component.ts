import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blog;

  constructor() { }

  ngOnInit(): void {
  }

  getDate() {
    return this.blog.createdOn || 'unknown';
  }
}
